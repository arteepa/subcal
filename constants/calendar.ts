import type { CalendarService } from '~/types'

export const CALENDAR_SERVICES: Record<CalendarService, { name: string; icon: string; description: string }> = {
  apple: {
    name: 'Apple Calendar',
    icon: '🍎',
    description: 'iPhone, iPad, Mac'
  },
  google: {
    name: 'Google Calendar',
    icon: '📅',
    description: 'Android, Web, Gmail'
  },
  outlook: {
    name: 'Outlook Calendar',
    icon: '📬',
    description: 'Windows, Office 365'
  }
}

export const CORS_PROXY_URL = 'https://api.allorigins.win/get?url='

export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM D, YYYY',
  EVENT_DATE: { weekday: 'short', month: 'short', day: 'numeric' } as const,
  EVENT_TIME: { hour: 'numeric', minute: '2-digit', hour12: true } as const
}

