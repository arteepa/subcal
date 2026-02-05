const features = [
  {
    title: 'Highly Compatible',
    description: 'Powered by the open .ICS format used by Google, Apple, and Outlook',
  },
  {
    title: 'Let Your Audience Subscribe',
    description:
      'Changes to your calendar automatically sync to all subscribers. No manual updates needed.',
  },
  {
    title: 'Manage From Your Calendar',
    description: 'Update events in Google, Apple, or Outlook — changes sync automatically',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-5">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-background-secondary border border-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
