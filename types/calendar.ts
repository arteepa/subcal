export interface CalendarEvent {
  id: string | number
  title: string
  startDate: Date
  endDate: Date
  location?: string
  description?: string
  organizer?: string
  url?: string
}

export interface CalendarMetadata {
  title: string
  description: string
  timezone?: string
  color?: string
}

export interface CalendarConfig {
  webCalUrl: string
  httpUrl: string
  name: string
  description: string
  timezone: string
  color: string
}

export interface UserConfig {
  username: string
  avatar?: string
  email?: string
  calendar: CalendarConfig
  social?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  settings: {
    theme: 'light' | 'dark'
    language: string
    dateFormat: string
    timeFormat: '12h' | '24h'
    developmentMode: boolean
  }
}

export type CalendarService = 'apple' | 'google' | 'outlook'

export interface SubscriptionInstructions {
  service: CalendarService
  actionUrl?: string
  manual: {
    title: string
    steps: string[]
  }[]
}

