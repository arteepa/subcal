import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toast } from '@/components/ui/Toast'

const instrumentSans = localFont({
  src: '../public/assets/InstrumentSans.woff2',
  variable: '--font-instrument',
  display: 'swap',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'subcal - Share Your Events',
  description: 'A web app for sharing iCalendar feeds with beautiful subscription pages',
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
