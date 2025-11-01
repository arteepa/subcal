import ICAL from 'ical.js'
import type { CalendarEvent, CalendarMetadata } from '~/types'
import { isValidICS } from '~/utils/validators'
import { ParseError, NetworkError } from '~/utils/errors'
import { CORS_PROXY_URL } from '~/constants'

// Module-level state for shared reactive state
const events = ref<CalendarEvent[]>([])
const metadata = ref<CalendarMetadata | null>(null)
const isLoading = ref(false)
const error = ref<Error | null>(null)

export function useCalendar() {
  const config = useRuntimeConfig()

  /**
   * Load calendar events from an ICS URL
   */
  async function loadCalendarFromUrl(url: string, useCorsProxy = true): Promise<void> {
    isLoading.value = true
    error.value = null
    
    try {
      let icsData: string
      
      // Check if we're in development mode
      if (config.public.developmentMode) {
        console.log('🔧 Development mode: Loading local example.ics file...')
        
        // Load local example.ics file
        const response = await fetch('/example.ics')
        
        if (!response.ok) {
          throw new NetworkError(
            `Failed to load local example.ics: ${response.status} ${response.statusText}`,
            response.status
          )
        }
        
        icsData = await response.text()
        console.log('✅ Successfully loaded local calendar data')
      } else {
        console.log('🌐 Production mode: Fetching calendar via CORS proxy...')
        
        // Use CORS proxy to fetch remote calendar
        const proxyUrl = useCorsProxy ? `${CORS_PROXY_URL}${encodeURIComponent(url)}` : url
        const response = await fetch(proxyUrl)
        
        if (!response.ok) {
          throw new NetworkError(
            `Failed to load calendar: ${response.status} ${response.statusText}`,
            response.status
          )
        }
        
        if (useCorsProxy) {
          const data = await response.json()
          
          if (!data.contents) {
            throw new NetworkError('CORS proxy did not return calendar data')
          }
          
          // Handle base64 encoded data
          if (data.contents.startsWith('data:')) {
            const base64Data = data.contents.split(',')[1]
            const binaryString = atob(base64Data)
            const bytes = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i)
            }
            icsData = new TextDecoder('utf-8').decode(bytes)
          } else {
            icsData = data.contents
          }
        } else {
          icsData = await response.text()
        }
        
        console.log('✅ Successfully fetched remote calendar data')
      }
      
      // Validate ICS data
      if (!isValidICS(icsData)) {
        throw new ParseError('Received data is not valid ICS calendar format')
      }
      
      console.log(`Calendar contains ${icsData.split('BEGIN:VEVENT').length - 1} events`)
      
      // Parse the ICS data
      parseICSData(icsData)
    } catch (err) {
      error.value = err as Error
      console.error('Error loading calendar:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Parse ICS data and extract events
   */
  function parseICSData(icsData: string): void {
    try {
      // Parse the ICS data using ical.js
      const jcalData = ICAL.parse(icsData)
      const comp = new ICAL.Component(jcalData)
      
      // Extract calendar metadata
      extractCalendarMetadata(comp)
      
      const vevents = comp.getAllSubcomponents('vevent')
      
      events.value = vevents.map((vevent: any, index: number) => {
        const event = new ICAL.Event(vevent)
        
        // Extract organizer
        let organizer = 'Event Organizer'
        const organizerProp = vevent.getFirstProperty('organizer')
        if (organizerProp) {
          const cn = organizerProp.getParameter('cn')
          if (cn) {
            organizer = cn
          }
        }
        
        // Extract URL
        let url: string | undefined
        const urlProp = vevent.getFirstProperty('url')
        if (urlProp) {
          url = urlProp.getFirstValue()
        }
        
        return {
          id: index + 1,
          title: event.summary || 'Untitled Event',
          startDate: event.startDate.toJSDate(),
          endDate: event.endDate.toJSDate(),
          location: event.location || undefined,
          description: event.description,
          organizer: organizer,
          url: url
        }
      })
      
      // Sort events by start date
      events.value.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    } catch (err) {
      console.error('Error parsing ICS data:', err)
      throw new ParseError('Failed to parse calendar data')
    }
  }

  /**
   * Extract calendar metadata from ICS component
   */
  function extractCalendarMetadata(comp: any): void {
    // Extract X-WR-CALNAME (calendar title)
    const calNameProp = comp.getFirstProperty('x-wr-calname')
    const title = calNameProp ? calNameProp.getFirstValue() : 'Calendar'
    
    // Extract X-WR-CALDESC (calendar description)
    const calDescProp = comp.getFirstProperty('x-wr-caldesc')
    const description = calDescProp ? calDescProp.getFirstValue() : 'Calendar events'
    
    // Extract X-WR-TIMEZONE (calendar timezone)
    const timezoneProp = comp.getFirstProperty('x-wr-timezone')
    const timezone = timezoneProp ? timezoneProp.getFirstValue() : undefined
    
    metadata.value = {
      title,
      description,
      timezone
    }
    
    console.log('Calendar metadata extracted:', metadata.value)
  }

  /**
   * Get upcoming events (today and future)
   */
  const upcomingEvents = computed(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    return events.value.filter(event => {
      const eventDate = new Date(
        event.startDate.getFullYear(),
        event.startDate.getMonth(),
        event.startDate.getDate()
      )
      return eventDate >= today
    })
  })

  /**
   * Get past events
   */
  const pastEvents = computed(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    return events.value.filter(event => {
      const eventDate = new Date(
        event.startDate.getFullYear(),
        event.startDate.getMonth(),
        event.startDate.getDate()
      )
      return eventDate < today
    })
  })

  /**
   * Clear all calendar data
   */
  function clearCalendar(): void {
    events.value = []
    metadata.value = null
    error.value = null
  }

  return {
    // State
    events: readonly(events),
    metadata: readonly(metadata),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Computed
    upcomingEvents,
    pastEvents,
    
    // Actions
    loadCalendarFromUrl,
    parseICSData,
    clearCalendar
  }
}

