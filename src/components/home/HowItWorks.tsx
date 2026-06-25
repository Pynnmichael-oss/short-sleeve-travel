const steps = [
  {
    number: '01',
    title: 'Pick a trip',
    description:
      'Browse our curated experiences and find one that calls to you.',
  },
  {
    number: '02',
    title: 'We handle it',
    description:
      'Flights, accommodation, and logistics are all taken care of.',
  },
  {
    number: '03',
    title: 'You show up',
    description: 'Arrive ready to explore. We handle the rest.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-sst-nav py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl text-sst-white mb-16">
          How a Short Sleeve trip works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {steps.map(({ number, title, description }) => (
            <div key={number} className="flex flex-col gap-4">
              <span className="font-display text-5xl text-sst-sand/40 leading-none">
                {number}
              </span>
              <h3 className="font-display text-2xl text-sst-white">{title}</h3>
              <p className="font-body text-sst-white/60 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
