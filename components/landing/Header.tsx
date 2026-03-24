import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50">
      <nav>
        <div className="max-w-container mx-auto px-5 flex justify-center items-center h-16">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="subcal"
              width={90}
              height={30}
              className="h-[30px]"
              style={{ width: 'auto' }}
              priority
            />
          </Link>
        </div>
      </nav>
    </header>
  )
}
