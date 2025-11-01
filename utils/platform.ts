export type Platform = 'ios' | 'android' | 'mac' | 'windows' | 'other'

/**
 * Detect the user's platform based on user agent
 */
export function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'other'
  
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera
  
  const isiOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream
  const isAndroid = /Android/.test(ua)
  const isMac = /Macintosh|Mac OS X/.test(ua)
  const isWindows = /Windows/.test(ua)
  
  if (isiOS) return 'ios'
  if (isAndroid) return 'android'
  if (isMac) return 'mac'
  if (isWindows) return 'windows'
  
  return 'other'
}

/**
 * Get the recommended calendar service based on platform
 */
export function getRecommendedService(): 'apple' | 'google' | 'outlook' {
  const platform = detectPlatform()
  
  switch (platform) {
    case 'ios':
    case 'mac':
      return 'apple'
    case 'android':
      return 'google'
    case 'windows':
      return 'outlook'
    default:
      return 'google'
  }
}

