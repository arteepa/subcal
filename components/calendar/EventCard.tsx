'use client'

import Image from 'next/image'
import type { CalendarEvent } from '@/lib/types'
import { formatDate } from '@/lib/utils'

interface EventCardProps {
  event: CalendarEvent
}

export function EventCard({ event }: EventCardProps) {
  const handleClick = () => {
    if (event.url) {
      window.open(event.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl border border-border bg-background-secondary/50 transition-all duration-300 hover:bg-background-secondary hover:border-white/10 ${
        event.url ? 'cursor-pointer' : ''
      }`}
      onClick={event.url ? handleClick : undefined}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-text-primary line-clamp-2">
            {event.title}
          </h3>
          {event.url && (
            <div className="text-text-secondary ml-2 flex-shrink-0">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 4.00001C19.5523 4 20 4.44772 20 5.00001V15.7618C20 16.3141 19.5523 16.7618 19 16.7618H17.8096C17.2573 16.7618 16.8096 16.3141 16.8096 15.7618L16.8095 9.44638L7.96303 18.2929C7.5725 18.6834 6.93933 18.6834 6.54881 18.2929L5.70708 17.4511C5.31657 17.0606 5.31658 16.4274 5.7071 16.0369L14.5535 7.19046H8.23822C7.68594 7.19046 7.23822 6.74275 7.23822 6.19046V5.00007C7.23822 4.44779 7.68593 4.00007 8.23822 4.00007L19 4.00001Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
          <Image
            src="/assets/icons/calendar.svg"
            alt="Date"
            width={16}
            height={16}
            className="opacity-60"
          />
          <span>{formatDate(event.startDate)}</span>
        </div>

        {event.location && (
          <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
            <Image
              src="/assets/icons/location.svg"
              alt="Location"
              width={16}
              height={16}
              className="opacity-60"
            />
            <span>{event.location}</span>
          </div>
        )}

        {event.description && (
          <p className="text-text-secondary text-sm line-clamp-2 mt-2">
            {event.description}
          </p>
        )}
      </div>
    </div>
  )
}
