'use client'

import { useEffect } from 'react'
import type { CalendarEvent, CalendarMetadata } from '@/lib/types'
import { useCalendarStore } from '@/stores/calendar-store'
import { CalendarHeader } from './CalendarHeader'
import { EventsList } from './EventsList'
import { SubscribeButton } from './SubscribeButton'
import { SubscribeModal } from './SubscribeModal'
import { filterFutureEvents } from '@/lib/ics-parser'

interface CalendarPageClientProps {
  metadata: CalendarMetadata
  events: CalendarEvent[]
  webCalUrl: string
  httpUrl: string
}

export function CalendarPageClient({
  metadata,
  events,
  webCalUrl,
  httpUrl,
}: CalendarPageClientProps) {
  const { setEvents, setMetadata, setUrls } = useCalendarStore()

  useEffect(() => {
    setMetadata(metadata)
    setEvents(events)
    setUrls(webCalUrl, httpUrl)
  }, [metadata, events, webCalUrl, httpUrl, setMetadata, setEvents, setUrls])

  const futureEvents = filterFutureEvents(events)

  return (
    <>
      <CalendarHeader metadata={metadata} />
      <main className="max-w-container mx-auto px-5 py-8 pb-24">
        <EventsList events={futureEvents} />
      </main>
      <SubscribeButton webCalUrl={webCalUrl} httpUrl={httpUrl} />
      <SubscribeModal webCalUrl={webCalUrl} httpUrl={httpUrl} />
    </>
  )
}
