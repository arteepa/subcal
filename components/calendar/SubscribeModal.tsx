'use client'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { CopyButton } from '@/components/ui/CopyButton'
import { useUIStore } from '@/stores/ui-store'
import { getSubscriptionUrl } from '@/lib/platform'
import type { SubscriptionService } from '@/lib/types'

interface SubscribeModalProps {
  webCalUrl: string
  httpUrl: string
}

const services: { id: SubscriptionService; icon: string; name: string; subtitle: string }[] = [
  { id: 'apple', icon: '🍎', name: 'Apple Calendar', subtitle: 'iPhone, iPad, Mac' },
  { id: 'google', icon: '📅', name: 'Google Calendar', subtitle: 'Android, Web, Gmail' },
  { id: 'outlook', icon: '📬', name: 'Outlook Calendar', subtitle: 'Windows, Office 365' },
]

export function SubscribeModal({ webCalUrl, httpUrl }: SubscribeModalProps) {
  const { isSubscribeModalOpen, closeSubscribeModal, activeSubscriptionService, setActiveService } =
    useUIStore()

  const handleServiceClick = (service: SubscriptionService) => {
    const url = getSubscriptionUrl(service, webCalUrl, httpUrl)
    
    if (service === 'apple' && url) {
      window.location.href = url
    } else if (service === 'google' && url) {
      window.open(url, '_blank')
    }
    
    setActiveService(service)
  }

  const handleBack = () => {
    setActiveService(null)
  }

  const renderServiceInstructions = () => {
    switch (activeSubscriptionService) {
      case 'apple':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="text-text-secondary hover:text-text-primary">
                ← Back
              </button>
              <h3 className="text-lg font-semibold">🍎 Subscribe with Apple Calendar</h3>
            </div>
            <p className="text-text-secondary">
              Tap the button to add this calendar using the webcal protocol.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={webCalUrl} className="btn-primary px-6 py-3 rounded-full font-semibold">
                Open in Apple Calendar
              </a>
            </div>
            <div>
              <p className="font-semibold text-text-primary mb-3">Manual Instructions (iPhone/iPad)</p>
              <ol className="list-decimal list-inside space-y-2 text-text-secondary">
                <li>Open the Settings app</li>
                <li>Go to Calendar → Accounts → Add Account → Other</li>
                <li>Under Calendars, choose &quot;Add Subscribed Calendar&quot;</li>
                <li>Enter: <code className="bg-bg-dark px-2 py-1 rounded text-sm">{webCalUrl}</code></li>
                <li>Tap Next, then Save</li>
              </ol>
            </div>
            <div>
              <p className="font-semibold text-text-primary mb-3">Manual Instructions (Mac)</p>
              <ol className="list-decimal list-inside space-y-2 text-text-secondary">
                <li>Open the Calendar app</li>
                <li>File → New Calendar Subscription…</li>
                <li>Paste: <code className="bg-bg-dark px-2 py-1 rounded text-sm">{webCalUrl}</code> and click Subscribe</li>
              </ol>
            </div>
          </div>
        )
      case 'google':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="text-text-secondary hover:text-text-primary">
                ← Back
              </button>
              <h3 className="text-lg font-semibold">📅 Subscribe with Google Calendar</h3>
            </div>
            <p className="text-text-secondary">
              Click the button below to add this calendar to your Google Calendar.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={getSubscriptionUrl('google', webCalUrl, httpUrl) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3 rounded-full font-semibold"
              >
                Add to Google Calendar
              </a>
              <CopyButton text={httpUrl} label="Copy URL" variant="secondary" />
            </div>
            <div>
              <p className="font-semibold text-text-primary mb-3">Manual Instructions</p>
              <ol className="list-decimal list-inside space-y-2 text-text-secondary">
                <li>Open Google Calendar in your browser</li>
                <li>Click the &quot;+&quot; next to &quot;Other calendars&quot;</li>
                <li>Select &quot;From URL&quot;</li>
                <li>Paste this URL: <code className="bg-bg-dark px-2 py-1 rounded text-sm break-all">{httpUrl}</code></li>
                <li>Click &quot;Add calendar&quot;</li>
              </ol>
            </div>
          </div>
        )
      case 'outlook':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="text-text-secondary hover:text-text-primary">
                ← Back
              </button>
              <h3 className="text-lg font-semibold">📬 Subscribe with Outlook Calendar</h3>
            </div>
            <p className="text-text-secondary">Follow these steps to add this calendar to Outlook:</p>
            <ol className="list-decimal list-inside space-y-2 text-text-secondary">
              <li>Open Outlook Calendar</li>
              <li>Click &quot;Add calendar&quot; or &quot;Subscribe to calendar&quot;</li>
              <li>Select &quot;From internet&quot;</li>
              <li>Enter this URL: <code className="bg-bg-dark px-2 py-1 rounded text-sm break-all">{httpUrl}</code></li>
              <li>Give it a name and click &quot;Import&quot;</li>
            </ol>
            <CopyButton text={httpUrl} label="Copy URL" variant="secondary" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Modal
      isOpen={isSubscribeModalOpen}
      onClose={closeSubscribeModal}
      title={activeSubscriptionService ? undefined : 'Subscribe to Calendar'}
    >
      {activeSubscriptionService ? (
        renderServiceInstructions()
      ) : (
        <div className="space-y-6">
          <p className="text-text-secondary">
            Subscribe with your preferred method to stay updated
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-bg-dark rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-text-primary mb-4">Popular Calendars</h3>
              <div className="space-y-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceClick(service.id)}
                    className="w-full flex items-center gap-4 p-3 rounded-lg bg-bg-card hover:bg-bg-card-alt transition-colors text-left"
                  >
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <div className="font-semibold text-text-primary">{service.name}</div>
                      <div className="text-sm text-text-secondary">{service.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-bg-dark rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-text-primary mb-4">Use direct URL</h3>
              <p className="text-text-secondary text-sm mb-4">
                Copy this URL to add to any calendar app
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={webCalUrl}
                  className="flex-1 px-3 py-2 bg-bg-card border border-border rounded-lg text-text-primary text-sm truncate"
                />
                <CopyButton text={webCalUrl} label="Copy" variant="primary" size="sm" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
