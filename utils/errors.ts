export class CalendarError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'CalendarError'
  }
}

export class NetworkError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ParseError'
  }
}

/**
 * Get a user-friendly error message
 */
export function getUserFriendlyError(error: unknown): string {
  if (error instanceof CalendarError) {
    return error.message
  }
  
  if (error instanceof NetworkError) {
    return 'Unable to load calendar data. Please check your internet connection.'
  }
  
  if (error instanceof ParseError) {
    return 'Unable to parse calendar data. The calendar format may be invalid.'
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return 'An unexpected error occurred. Please try again.'
}

