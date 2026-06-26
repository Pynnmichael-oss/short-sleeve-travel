const steps = [
  {
    number: '01',
    title: 'Who joins us',
    description:
      'Our travelers come from all walks of life — consultants, entrepreneurs, doctors, lawyers, nurses, finance professionals, and creatives. Most join solo, but we\'ve had friends, siblings, and couples join too. What unites everyone is the desire to explore the world in ways that are truly out of the ordinary.',
  },
  {
    number: '02',
    title: 'Why we\'re different',
    description:
      'Unlike typical group trips, Shortsleeve Travel focuses on high-end adventure and unique experiences. It\'s about meeting like-minded people and creating authentic, life-changing experiences.',
  },
  {
    number: '03',
    title: 'Pricing',
    description:
      'Our trips range from $1k to $3k per person, with everything taken care of — from accommodations to itinerary planning. All you have to do is relax and enjoy.',
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
