import Image from 'next/image'
import Link from 'next/link'
import type { CalendarMetadata } from '@/lib/types'

interface CalendarHeaderProps {
  metadata: CalendarMetadata
}

export function CalendarHeader({ metadata }: CalendarHeaderProps) {
  return (
    <header className="bg-background sticky top-0 z-50 border-b border-border">
      <div className="max-w-container mx-auto px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="subcal"
              width={90}
              height={30}
              className="h-[30px] w-auto"
              priority
            />
          </Link>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          {metadata.title}
        </h1>
        <p className="text-text-secondary">{metadata.description}</p>
      </div>
    </header>
  )
}
