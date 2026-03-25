'use client'

import Image from 'next/image'
import type { CalendarEvent } from '@/lib/types'

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
      className={`py-4 transition-colors ${event.url ? 'cursor-pointer hover:bg-bg-card/50' : ''}`}
      onClick={event.url ? handleClick : undefined}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-text-primary leading-snug">
          {event.title}
        </h3>
        {event.url && (
          <div className="text-text-secondary flex-shrink-0 mt-1">
            <svg
              className="w-4 h-4"
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

      {event.description && (
        <p className="text-text-secondary text-sm line-clamp-2 mt-1">
          {event.description}
        </p>
      )}

      {event.location && (
        <div className="flex items-center gap-1.5 text-text-secondary text-sm mt-2">
          <Image
            src="/assets/icons/location.svg"
            alt=""
            width={14}
            height={14}
            className="opacity-60"
          />
          <span>{event.location}</span>
        </div>
      )}
    </div>
  )
}
