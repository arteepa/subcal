import { create } from 'zustand'
import type { CalendarEvent, CalendarMetadata } from '@/lib/types'

interface CalendarState {
  events: CalendarEvent[]
  metadata: CalendarMetadata | null
  isLoading: boolean
  error: string | null
  webCalUrl: string
  httpCalUrl: string
  
  // Actions
  setEvents: (events: CalendarEvent[]) => void
  setMetadata: (metadata: CalendarMetadata) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setUrls: (webCalUrl: string, httpCalUrl: string) => void
}

export const useCalendarStore = create<CalendarState>((set) => ({
  events: [],
  metadata: null,
  isLoading: true,
  error: null,
  webCalUrl: '',
  httpCalUrl: '',

  setEvents: (events) => set({ events, isLoading: false }),
  setMetadata: (metadata) => set({ metadata }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  setUrls: (webCalUrl, httpCalUrl) => set({ webCalUrl, httpCalUrl }),
}))
