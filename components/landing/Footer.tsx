export function Footer() {
  return (
    <footer className="py-12 px-5 border-t border-border">
      <div className="max-w-container mx-auto text-center">
        <p className="text-text-secondary mb-2">built for seamless calendar sharing</p>
        <p className="text-text-secondary">
          by{' '}
          <a
            href="https://artee.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            artee.xyz
          </a>
        </p>
      </div>
    </footer>
  )
}
