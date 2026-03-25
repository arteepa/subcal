export function Footer() {
  return (
    <footer className="section-card section-card-even text-center !py-6" style={{ padding: '24px' }}>
      <div className="text-text-secondary text-sm">
        Built for seamless sharing by{' '}
        <a
          href="https://artee.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary no-underline hover:text-text-primary"
        >
          artee.xyz
        </a>
      </div>
      <div className="mt-2">
        <a href="#" className="text-text-secondary no-underline mx-2 text-sm hover:text-text-primary">
          Terms
        </a>
        <a href="#" className="text-text-secondary no-underline mx-2 text-sm hover:text-text-primary">
          Privacy
        </a>
      </div>
    </footer>
  )
}
