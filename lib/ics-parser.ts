import ICAL from 'ical.js'
import type { CalendarEvent, CalendarMetadata } from './types'

export interface ParsedCalendar {
  metadata: CalendarMetadata
  events: CalendarEvent[]
}

export function parseICS(icsData: string): ParsedCalendar {
  const jcalData = ICAL.parse(icsData)
  const comp = new ICAL.Component(jcalData)
  
  // Extract metadata
  const calNameProp = comp.getFirstProperty('x-wr-calname')
  const calDescProp = comp.getFirstProperty('x-wr-caldesc')
  
  const metadata: CalendarMetadata = {
    title: calNameProp ? calNameProp.getFirstValue() : 'Calendar',
    description: calDescProp ? calDescProp.getFirstValue() : 'Calendar events',
  }
  
  // Extract events
  const vevents = comp.getAllSubcomponents('vevent')
  
  const events: CalendarEvent[] = vevents.map((vevent: ICAL.Component, index: number) => {
    const event = new ICAL.Event(vevent)
    
    // Extract organizer
    let organizer = 'Event Organizer'
    const organizerProp = vevent.getFirstProperty('organizer')
    if (organizerProp) {
      const cn = organizerProp.getParameter('cn')
      if (cn) {
        organizer = cn
      }
    }
    
    // Extract URL
    let url: string | null = null
    const urlProp = vevent.getFirstProperty('url')
    if (urlProp) {
      url = urlProp.getFirstValue()
    }
    
    return {
      id: index + 1,
      title: event.summary || 'Untitled Event',
      startDate: event.startDate.toJSDate(),
      endDate: event.endDate.toJSDate(),
      location: event.location || null,
      description: event.description || null,
      organizer,
      url,
    }
  })
  
  // Sort events by start date
  events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
  
  return { metadata, events }
}

export function filterFutureEvents(events: CalendarEvent[]): CalendarEvent[] {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  return events.filter((event) => {
    const eventDate = new Date(
      event.startDate.getFullYear(),
      event.startDate.getMonth(),
      event.startDate.getDate()
    )
    return eventDate >= today
  })
}

export async function fetchICSData(httpUrl: string, isDevelopment: boolean): Promise<string> {
  if (isDevelopment) {
    // In development, fetch from local example file via API route
    const response = await fetch('/api/calendar/example')
    if (!response.ok) {
      throw new Error(`Failed to load example.ics: ${response.status}`)
    }
    return response.text()
  }
  
  // In production, fetch directly (server-side) or via proxy (client-side)
  const response = await fetch(httpUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch calendar: ${response.status}`)
  }
  return response.text()
}
