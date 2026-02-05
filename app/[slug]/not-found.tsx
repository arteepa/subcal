import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Calendar Not Found
        </h1>
        <p className="text-text-secondary mb-8">
          The calendar you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/">
          <Button variant="primary">Go to Homepage</Button>
        </Link>
      </div>
    </div>
  )
}
