export interface CalendarEvent {
  id: number
  title: string
  startDate: Date
  endDate: Date
  location: string | null
  description: string | null
  organizer: string
  url: string | null
}

export interface CalendarMetadata {
  title: string
  description: string
}

export interface CalendarConfig {
  username: string
  avatar: string
  email: string
  calendar: {
    webCalUrl: string
    httpUrl: string
    name: string
    description: string
    timezone: string
    color: string
  }
  social: {
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

export type Platform = 'ios' | 'android' | 'mac' | 'windows' | 'other'

export type SubscriptionService = 'apple' | 'google' | 'outlook'
