import type { Platform } from './types'

export function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'other'
  
  const ua = navigator.userAgent || ''
  
  const isiOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream
  const isMac = /Macintosh|Mac OS X/.test(ua)
  const isAndroid = /Android/.test(ua)
  const isWindows = /Windows/.test(ua)
  
  if (isiOS) return 'ios'
  if (isAndroid) return 'android'
  if (isMac) return 'mac'
  if (isWindows) return 'windows'
  return 'other'
}

export function getSubscriptionUrl(
  service: 'apple' | 'google' | 'outlook',
  webCalUrl: string,
  httpUrl: string
): string | null {
  switch (service) {
    case 'apple':
      return webCalUrl
    case 'google':
      return `https://calendar.google.com/calendar/u/0/r/settings/addbyurl?cid=${encodeURIComponent(httpUrl)}`
    case 'outlook':
      return null // Outlook requires manual URL entry
    default:
      return null
  }
}
