import Link from 'next/link'

export function Header() {
  return (
    <header className="section-card glass-header">
      <Link href="/" className="text-2xl font-bold text-text-primary no-underline">
        sub<span className="text-accent">cal</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <a href="#features" className="text-text-secondary text-[0.95rem] no-underline hover:text-text-primary">
          Features
        </a>
        <a href="#how-it-works" className="text-text-secondary text-[0.95rem] no-underline hover:text-text-primary">
          How it Works
        </a>
        <a href="#pricing" className="text-text-secondary text-[0.95rem] no-underline hover:text-text-primary">
          Pricing
        </a>
      </nav>
      <a href="#pricing" className="btn-primary btn-sm no-underline">
        Get Started
      </a>
    </header>
  )
}
