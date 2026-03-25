export function Hero() {
  return (
    <section className="section-card section-card-even">
      <div className="text-center max-w-[850px] mx-auto">
        <span className="inline-block text-sm font-bold text-accent capitalize mb-4">
          Open Calendar Broadcasting
        </span>
        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-text-primary leading-[1.1] tracking-[-0.02em]">
          Broadcast a calendar, let people subscribe.
        </h1>
        <p className="text-text-secondary text-lg mt-6">
          Use an open .ICS format or link directly to your existing Google, Apple, or Outlook calendar.
          Perfect for events, teams, and communities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <a href="#pricing" className="btn-primary no-underline">
            Go Live for $10/Year
          </a>
          <a href="#how-it-works" className="btn-secondary no-underline">
            See How It Works
          </a>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-3 mt-24 opacity-40">
        <div className="aspect-square bg-border rounded-xl" />
        <div className="aspect-square bg-border rounded-xl" />
        <div className="aspect-square bg-accent rounded-xl" />
        <div className="aspect-square bg-border rounded-xl" />
        <div className="aspect-square bg-border rounded-xl" />
        <div className="aspect-square bg-border rounded-xl" />
        <div className="aspect-square bg-border rounded-xl" />
        <div className="aspect-square bg-border rounded-xl" />
        <div className="aspect-square bg-border rounded-xl" />
        <div className="aspect-square bg-border rounded-xl" />
        <div className="aspect-square bg-border rounded-xl" />
        <div className="aspect-square bg-border rounded-xl" />
        <div className="aspect-square bg-accent rounded-xl" />
        <div className="aspect-square bg-border rounded-xl" />
      </div>
    </section>
  )
}
