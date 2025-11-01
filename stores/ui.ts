import { defineStore } from 'pinia'
import type { Toast, Modal } from '~/types'

export const useUiStore = defineStore('ui', () => {
  // State
  const toasts = ref<Toast[]>([])
  const modals = ref<Modal[]>([])
  const isLoading = ref(false)

  // Getters
  const activeModal = computed(() => modals.value.find(m => m.isOpen))
  const hasActiveModal = computed(() => !!activeModal.value)

  // Toast Actions
  function addToast(toast: Omit<Toast, 'id'>): string {
    const id = `toast-${Date.now()}-${Math.random()}`
    const newToast: Toast = {
      id,
      ...toast,
      duration: toast.duration || 4000
    }
    
    toasts.value.push(newToast)
    
    // Auto-dismiss after duration
    const duration = newToast.duration ?? 4000
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
    
    return id
  }

  function removeToast(id: string): void {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  function showSuccess(message: string, duration?: number): string {
    return addToast({ type: 'success', message, duration })
  }

  function showError(message: string, duration?: number): string {
    return addToast({ type: 'error', message, duration })
  }

  function showInfo(message: string, duration?: number): string {
    return addToast({ type: 'info', message, duration })
  }

  function showWarning(message: string, duration?: number): string {
    return addToast({ type: 'warning', message, duration })
  }

  function clearAllToasts(): void {
    toasts.value = []
  }

  // Modal Actions
  function openModal(modal: Omit<Modal, 'isOpen'>): void {
    // Close any existing modal with the same ID
    const existingIndex = modals.value.findIndex(m => m.id === modal.id)
    if (existingIndex !== -1) {
      modals.value[existingIndex].isOpen = true
    } else {
      modals.value.push({ ...modal, isOpen: true })
    }
    
    // Prevent body scrolling when modal is open
    if (process.client) {
      document.body.classList.add('modal-open')
    }
  }

  function closeModal(id: string): void {
    const modal = modals.value.find(m => m.id === id)
    if (modal) {
      modal.isOpen = false
    }
    
    // Re-enable body scrolling if no modals are open
    if (!hasActiveModal.value && process.client) {
      document.body.classList.remove('modal-open')
    }
  }

  function closeAllModals(): void {
    modals.value.forEach(m => m.isOpen = false)
    
    if (process.client) {
      document.body.classList.remove('modal-open')
    }
  }

  // Loading Actions
  function setLoading(loading: boolean): void {
    isLoading.value = loading
  }

  return {
    // State
    toasts,
    modals,
    isLoading,
    
    // Getters
    activeModal,
    hasActiveModal,
    
    // Actions
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    clearAllToasts,
    openModal,
    closeModal,
    closeAllModals,
    setLoading
  }
})

