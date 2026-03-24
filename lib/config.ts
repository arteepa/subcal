import type { CalendarConfig } from './types'

// Calendar configurations by slug
const calendars: Record<string, CalendarConfig> = {
  panorama: {
    username: 'Artee',
    avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    email: '-',
    calendar: {
      webCalUrl: 'webcal://calendar.google.com/calendar/ical/c_a323145e31d68becfab6a971a42df2462cdc130880df65e4c43754980f08b125%40group.calendar.google.com/public/basic.ics',
      httpUrl: 'https://calendar.google.com/calendar/ical/c_a323145e31d68becfab6a971a42df2462cdc130880df65e4c43754980f08b125%40group.calendar.google.com/public/basic.ics',
      name: "Pablo's Events Calendar",
      description: 'Personal and professional events calendar',
      timezone: 'America/New_York',
      color: '#4285f4',
    },
    social: {
      github: 'https://github.com/pablo',
      linkedin: 'https://linkedin.com/in/pablo',
      twitter: 'https://twitter.com/pablo',
    },
    settings: {
      theme: 'dark',
      language: 'en-US',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      developmentMode: process.env.NODE_ENV === 'development',
    },
  },
  // Second public page — swap webCalUrl/httpUrl for your own Google (or other) ICS feed.
  artee: {
    username: 'Artee',
    avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    email: '-',
    calendar: {
      webCalUrl:
        'webcal://calendar.google.com/calendar/ical/c_4e1926d42f0dd420e8096dfa8692bca22b229a01c225352eabc68d9dd700dfff%40group.calendar.google.com/public/basic.ics',
      httpUrl:
        'https://calendar.google.com/calendar/ical/c_4e1926d42f0dd420e8096dfa8692bca22b229a01c225352eabc68d9dd700dfff%40group.calendar.google.com/public/basic.ics',
      name: 'Artee',
      description: 'Artee\'s DJ Gigs calendar',
      timezone: 'America/New_York',
      color: '#0f9d58',
    },
    social: {
      github: 'https://github.com/pablo',
      linkedin: 'https://linkedin.com/in/pablo',
      twitter: 'https://twitter.com/pablo',
    },
    settings: {
      theme: 'dark',
      language: 'en-US',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      developmentMode: process.env.NODE_ENV === 'development',
    },
  },
}

export function getCalendarConfig(slug: string): CalendarConfig | null {
  return calendars[slug] || null
}

export function getAllCalendarSlugs(): string[] {
  return Object.keys(calendars)
}

export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xrbyqwkv'
