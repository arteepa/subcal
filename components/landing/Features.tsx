const features = [
  {
    title: 'Highly Compatible',
    description: 'Powered by the open .ICS format. Works out of the box with virtually every modern calendar application.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    title: 'Live Sync',
    description: 'Subscribers get real-time updates pushed directly to their devices. No manual refreshing needed.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: 'Native Control',
    description: 'Manage events right inside your native Google or Apple calendar. We handle the rest.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
      </svg>
    ),
  },
]

export function Features() {
  return (
    <section id="features" className="section-card section-card-odd">
      <div className="text-center">
        <span className="inline-block text-sm font-bold text-accent capitalize mb-4">
          Seamless Integration
        </span>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-text-primary leading-[1.1] tracking-[-0.02em]">
          Built for compatibility
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
        {features.map((feature) => (
          <div key={feature.title} className="inner-card">
            <div className="text-accent mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2 leading-[1.1]">
              {feature.title}
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
