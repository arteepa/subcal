const steps = [
  {
    number: 1,
    title: 'Connect your Calendar',
    description: 'Paste your .ICS link from Google, Apple, Outlook, or your own hosting',
  },
  {
    number: 2,
    title: 'Verify it works',
    description: 'Preview your events and make sure everything syncs right.',
  },
  {
    number: 3,
    title: 'Go Live for $10/Year',
    description: 'Publish your calendar as a public page your audience can subscribe to.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-5">
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent text-background font-bold text-xl flex items-center justify-center mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                {step.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
