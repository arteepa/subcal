'use client'

import type { CalendarEvent } from '@/lib/types'
import { formatDateGroupKey, formatDateGroupLabel } from '@/lib/utils'
import { EventCard } from './EventCard'

interface EventsListProps {
  events: CalendarEvent[]
  isLoading?: boolean
  error?: string | null
}

function groupEventsByDate(events: CalendarEvent[]) {
  const groups: { key: string; label: string; date: Date; events: CalendarEvent[] }[] = []
  const map = new Map<string, (typeof groups)[number]>()

  for (const event of events) {
    const key = formatDateGroupKey(event.startDate)
    let group = map.get(key)
    if (!group) {
      group = { key, label: formatDateGroupLabel(event.startDate), date: event.startDate, events: [] }
      map.set(key, group)
      groups.push(group)
    }
    group.events.push(event)
  }

  return groups
}

export function EventsList({ events, isLoading, error }: EventsListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12 text-text-secondary">
        Loading events from calendar feed...
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-bg-card border border-border rounded-2xl p-8 text-center">
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          Unable to load calendar events
        </h3>
        <p className="text-text-secondary mb-4">
          There was an error loading the calendar feed.
        </p>
        <p className="text-text-secondary text-sm mb-6">
          <strong>Technical details:</strong> {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-accent text-text-inverse rounded-full font-semibold hover:bg-accent-hover transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary">
        No upcoming events found.
      </div>
    )
  }

  const dateGroups = groupEventsByDate(events)

  return (
    <div className="space-y-4">
      {dateGroups.map((group) => (
        <div key={group.key}>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-wider text-accent uppercase">
              {group.label}
            </h2>
          </div>
          <div className="divide-y divide-border">
            {group.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
