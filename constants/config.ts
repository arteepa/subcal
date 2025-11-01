import type { UserConfig } from '~/types'

// Default user configuration
export const DEFAULT_USER_CONFIG: UserConfig = {
  username: 'Pablo Rodriguez',
  avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4',
  email: 'pablo@example.com',
  calendar: {
    webCalUrl: 'webcal://calendar.google.com/calendar/ical/c_a323145e31d68becfab6a971a42df2462cdc130880df65e4c43754980f08b125%40group.calendar.google.com/public/basic.ics',
    httpUrl: 'https://calendar.google.com/calendar/ical/c_a323145e31d68becfab6a971a42df2462cdc130880df65e4c43754980f08b125%40group.calendar.google.com/public/basic.ics',
    name: "Pablo's Events Calendar",
    description: 'Personal and professional events calendar',
    timezone: 'America/New_York',
    color: '#4285f4'
  },
  social: {
    github: 'https://github.com/pablo',
    linkedin: 'https://linkedin.com/in/pablo',
    twitter: 'https://twitter.com/pablo'
  },
  settings: {
    theme: 'dark',
    language: 'en-US',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    developmentMode: true
  }
}

