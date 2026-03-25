'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200',
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-8 py-4': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          {
            'bg-accent text-text-inverse hover:bg-accent-hover hover:-translate-y-0.5':
              variant === 'primary',
            'border border-border text-text-primary hover:bg-bg-card-alt':
              variant === 'secondary',
            'text-text-secondary hover:text-text-primary':
              variant === 'ghost',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
