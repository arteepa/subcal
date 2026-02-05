'use client'

import { FormEvent, useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useUIStore } from '@/stores/ui-store'
import { FORMSPREE_ID } from '@/lib/config'

export function InterestModal() {
  const { isInterestModalOpen, closeInterestModal, showToast } = useUIStore()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        showToast("Thank you for your interest! We'll notify you when we launch.")
        closeInterestModal()
        setEmail('')
      } else {
        throw new Error('Form submission failed')
      }
    } catch {
      showToast('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isInterestModalOpen}
      onClose={closeInterestModal}
      title="Express Your Interest"
    >
      <p className="text-text-secondary mb-6">
        Be the first to know when subcal launches!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-3 bg-white/5 border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
        />
        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Notify Me'}
        </Button>
      </form>
    </Modal>
  )
}
