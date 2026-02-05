'use client'

import { useEffect } from 'react'
import { useUIStore } from '@/stores/ui-store'

export function Toast() {
  const { toastMessage, hideToast } = useUIStore()

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(hideToast, 4000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage, hideToast])

  if (!toastMessage) return null

  return (
    <div className="fixed top-5 right-5 z-[1001] animate-modal-slide-up">
      <div className="bg-green-500 text-white px-5 py-4 rounded-lg font-medium shadow-lg">
        {toastMessage}
      </div>
    </div>
  )
}
