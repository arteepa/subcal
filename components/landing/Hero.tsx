import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-5 py-20">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
          Broadcast a calendar,{' '}
          <br className="hidden sm:block" />
          let people subscribe.
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-xl mx-auto">
          Use an .ICS or a regular Google, Apple, or Outlook, etc calendar.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/panorama">
            <Button variant="primary" size="lg">
              Local Event Curation
            </Button>
          </Link>
          <Link href="/artee">
            <Button variant="secondary" size="lg">
              DJ Gigs Example
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
