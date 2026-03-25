import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toast } from '@/components/ui/Toast'

const instrumentSans = localFont({
  src: '../assets/InstrumentSans.woff2',
  variable: '--font-instrument',
  display: 'swap',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'subcal - Broadcast Your Calendar',
  description: 'Broadcast a calendar, let people subscribe. Use an open .ICS format or link directly to your existing Google, Apple, or Outlook calendar.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} font-sans antialiased`}>
        {children}
        <Toast />
      </body>
    </html>
  )
}
