'use client'

import { useState } from 'react'
import { Button, ButtonProps } from './Button'

interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  text: string
  label?: string
  copiedLabel?: string
}

export function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Button onClick={handleCopy} {...props}>
      {copied ? `✅ ${copiedLabel}` : `📋 ${label}`}
    </Button>
  )
}
