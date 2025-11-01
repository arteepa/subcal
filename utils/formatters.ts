import { DATE_FORMATS } from '~/constants'

/**
 * Format a date for display in event cards
 */
export function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', DATE_FORMATS.EVENT_DATE).format(date)
}

/**
 * Format a time for display in event cards
 */
export function formatEventTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', DATE_FORMATS.EVENT_TIME).format(date)
}

/**
 * Format a date for Google Calendar URL
 */
export function formatGoogleDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

/**
 * Escape HTML entities to prevent XSS
 */
export function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * Truncate text to a maximum length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

