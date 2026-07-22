const steps = [
  {
    number: '01',
    title: 'Who joins us',
    description:
      'Our travelers come from all walks of life: consultants, doctors, nurses, lawyers, entrepreneurs, and creatives. Most come solo, some bring a friend or partner. Everyone\'s here to explore in a way that\'s out of the ordinary.',
  },
  {
    number: '02',
    title: 'Why we\'re different',
    description:
      'This isn\'t a typical group tour. We focus on high-end adventure and experiences you won\'t find in a brochure. It\'s as much about who you meet as where you go.',
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
          How a Shortsleeve trip works
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
