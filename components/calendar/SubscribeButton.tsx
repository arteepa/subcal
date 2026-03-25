'use client'

import { useUIStore } from '@/stores/ui-store'
import { detectPlatform, getSubscriptionUrl } from '@/lib/platform'

interface SubscribeButtonProps {
  webCalUrl: string
  httpUrl: string
}

export function SubscribeButton({ webCalUrl, httpUrl }: SubscribeButtonProps) {
  const { openSubscribeModal } = useUIStore()

  const handleSmartSubscribe = () => {
    const platform = detectPlatform()
    
    if (platform === 'ios' || platform === 'mac') {
      window.location.href = webCalUrl
      setTimeout(openSubscribeModal, 1200)
      return
    }
    
    if (platform === 'android') {
      const googleUrl = getSubscriptionUrl('google', webCalUrl, httpUrl)
      if (googleUrl) {
        window.location.href = googleUrl
        setTimeout(openSubscribeModal, 1200)
        return
      }
    }
    
    openSubscribeModal()
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-bg-dark to-transparent">
      <div className="max-w-container mx-auto">
        <button
          onClick={handleSmartSubscribe}
          className="w-full py-4 px-6 bg-accent hover:bg-accent-hover text-text-inverse font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Subscribe to Calendar
        </button>
      </div>
    </div>
  )
}
