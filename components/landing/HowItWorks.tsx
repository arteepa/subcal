const steps = [
  {
    number: '01',
    title: 'Connect your Calendar',
    description: 'Paste your public .ICS link from your existing provider into our secure dashboard.',
  },
  {
    number: '02',
    title: 'Auto Validation',
    description: 'We automatically validate the feed and generate a beautiful landing page for your audience.',
  },
  {
    number: '03',
    title: 'Share & Scale',
    description: 'Share your unique Subcal link. Your audience clicks once to stay synced forever.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-card section-card-even">
      <span className="inline-block text-sm font-bold text-accent capitalize mb-4">
        The Process
      </span>
      <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-text-primary leading-[1.1] tracking-[-0.02em]">
        Broadcast in minutes
      </h2>
      <div className="flex flex-col gap-12 mt-24">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`flex flex-col md:flex-row items-start gap-4 md:gap-12 pb-12 ${
              i < steps.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="text-[4rem] font-extrabold text-accent opacity-30 leading-none">
              {step.number}
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-2 leading-[1.1]">
                {step.title}
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
