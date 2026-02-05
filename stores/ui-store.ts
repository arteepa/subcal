import { create } from 'zustand'
import type { SubscriptionService } from '@/lib/types'

interface UIState {
  isSubscribeModalOpen: boolean
  isInterestModalOpen: boolean
  activeSubscriptionService: SubscriptionService | null
  toastMessage: string | null
  
  // Actions
  openSubscribeModal: () => void
  closeSubscribeModal: () => void
  openInterestModal: () => void
  closeInterestModal: () => void
  setActiveService: (service: SubscriptionService | null) => void
  showToast: (message: string) => void
  hideToast: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isSubscribeModalOpen: false,
  isInterestModalOpen: false,
  activeSubscriptionService: null,
  toastMessage: null,

  openSubscribeModal: () => set({ isSubscribeModalOpen: true, activeSubscriptionService: null }),
  closeSubscribeModal: () => set({ isSubscribeModalOpen: false, activeSubscriptionService: null }),
  openInterestModal: () => set({ isInterestModalOpen: true }),
  closeInterestModal: () => set({ isInterestModalOpen: false }),
  setActiveService: (service) => set({ activeSubscriptionService: service }),
  showToast: (message) => {
    set({ toastMessage: message })
    setTimeout(() => set({ toastMessage: null }), 4000)
  },
  hideToast: () => set({ toastMessage: null }),
}))
