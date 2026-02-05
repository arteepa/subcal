'use client'

import type { CalendarEvent } from '@/lib/types'
import { EventCard } from './EventCard'

interface EventsListProps {
  events: CalendarEvent[]
  isLoading?: boolean
  error?: string | null
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
      <div className="bg-background-secondary border border-border rounded-2xl p-8 text-center">
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
          className="px-6 py-3 bg-accent text-background rounded-lg font-semibold hover:bg-accent-hover transition-colors"
        >
          🔄 Retry
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

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
