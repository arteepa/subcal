import type { CalendarService } from '~/types'
import { detectPlatform, getRecommendedService } from '~/utils/platform'

export function useSubscription(webCalUrl: string, httpUrl: string) {
  const uiStore = useUiStore()

  /**
   * Generate subscription URL for a specific service
   */
  function getSubscriptionUrl(service: CalendarService): string {
    switch (service) {
      case 'apple':
        return webCalUrl
      case 'google':
        return `https://calendar.google.com/calendar/u/0/r/settings/addbyurl?cid=${encodeURIComponent(httpUrl)}`
      case 'outlook':
        return httpUrl
      default:
        return webCalUrl
    }
  }

  /**
   * Handle subscription for a specific service
   */
  function handleSubscription(service: CalendarService): void {
    const url = getSubscriptionUrl(service)
    
    if (service === 'apple') {
      // For Apple Calendar, use same-window to allow iOS/macOS to intercept webcal://
      window.location.href = url
    } else if (service === 'google') {
      // Open Google Calendar in a new tab
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      // For other services, just show the modal with instructions
      // The URL will be available for copying
    }
  }

  /**
   * Smart subscription based on platform detection
   */
  function smartSubscribe(): void {
    const recommendedService = getRecommendedService()
    handleSubscription(recommendedService)
  }

  /**
   * Copy URL to clipboard
   */
  async function copyToClipboard(url: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(url)
      uiStore.showSuccess('URL copied to clipboard!')
      return true
    } catch (err) {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea')
        textArea.value = url
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        uiStore.showSuccess('URL copied to clipboard!')
        return true
      } catch (fallbackErr) {
        uiStore.showError('Failed to copy URL. Please copy it manually.')
        return false
      }
    }
  }

  /**
   * Generate Google Calendar URL for individual event
   */
  function generateGoogleEventUrl(event: any): string {
    const formatGoogleDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatGoogleDate(event.startDate)}/${formatGoogleDate(event.endDate)}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`
  }

  return {
    getSubscriptionUrl,
    handleSubscription,
    smartSubscribe,
    copyToClipboard,
    generateGoogleEventUrl,
    detectPlatform,
    getRecommendedService
  }
}

