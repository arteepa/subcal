import { notFound } from 'next/navigation'
import { getCalendarConfig, getAllCalendarSlugs } from '@/lib/config'
import { parseICS } from '@/lib/ics-parser'
import { CalendarPageClient } from '@/components/calendar/CalendarPageClient'
import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllCalendarSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const config = getCalendarConfig(slug)
  
  if (!config) {
    return { title: 'Calendar Not Found' }
  }

  return {
    title: `${config.calendar.name} | subcal`,
    description: config.calendar.description,
  }
}

async function getCalendarData(slug: string) {
  const config = getCalendarConfig(slug)
  
  if (!config) {
    return null
  }

  try {
    let icsData: string

    if (config.settings.developmentMode) {
      const localFile = config.calendar.localIcsFile ?? 'example.ics'
      const filePath = path.join(process.cwd(), localFile)
      icsData = fs.readFileSync(filePath, 'utf-8')
    } else {
      // In production, fetch from remote URL with caching
      const response = await fetch(config.calendar.httpUrl, {
        next: { revalidate: 3600 }, // Revalidate every hour
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch calendar: ${response.status}`)
      }

      icsData = await response.text()
    }

    const parsed = parseICS(icsData)
    // Multiple slugs can share one ICS URL; keep per-slug branding from config when needed.
    const metadata =
      slug === 'artee'
        ? {
            title: config.calendar.name,
            description: config.calendar.description,
          }
        : parsed.metadata
    const { events } = parsed

    // Serialize dates for client components
    const serializedEvents = events.map((event) => ({
      ...event,
      startDate: event.startDate.toISOString(),
      endDate: event.endDate.toISOString(),
    }))

    return {
      metadata,
      events: serializedEvents,
      webCalUrl: config.calendar.webCalUrl,
      httpUrl: config.calendar.httpUrl,
    }
  } catch (error) {
    console.error('Error loading calendar data:', error)
    return null
  }
}

export default async function CalendarPage({ params }: PageProps) {
  const { slug } = await params
  const data = await getCalendarData(slug)

  if (!data) {
    notFound()
  }

  // Deserialize dates back to Date objects
  const events = data.events.map((event) => ({
    ...event,
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
  }))

  return (
    <CalendarPageClient
      metadata={data.metadata}
      events={events}
      webCalUrl={data.webCalUrl}
      httpUrl={data.httpUrl}
    />
  )
}
