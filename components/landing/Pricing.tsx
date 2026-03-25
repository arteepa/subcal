export function Pricing() {
  return (
    <section id="pricing" className="section-card section-card-odd">
      <div className="text-center">
        <span className="inline-block text-sm font-bold text-accent capitalize mb-4">
          Pricing
        </span>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-text-primary leading-[1.1] tracking-[-0.02em]">
          Simple and transparent
        </h2>
      </div>
      <div className="inner-card max-w-[500px] mx-auto mt-24 text-center">
        <p className="text-sm font-bold text-accent">Pro Plan</p>
        <div className="text-[4rem] font-bold text-text-primary my-4">
          $10<span className="text-xl text-text-secondary">/year</span>
        </div>
        <ul className="text-left my-12 space-y-3">
          {[
            'Unlimited subscribers',
            'Real-time auto-syncing',
            'Custom subcal.to/name link',
            'Works with all major apps',
          ].map((item) => (
            <li key={item} className="text-text-secondary text-lg pl-7 relative before:content-['✓'] before:absolute before:left-0 before:text-accent before:font-bold">
              {item}
            </li>
          ))}
        </ul>
        <a href="#" className="btn-primary w-full no-underline">
          Get Started Now
        </a>
      </div>
    </section>
  )
}
