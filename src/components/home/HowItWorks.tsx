const steps = [
  {
    number: '01',
    title: 'Who joins us',
    description:
      "Our travelers are typically in their 20s and 30s, professionals, entrepreneurs, creatives, and adventurers looking to explore the world with like-minded people. While you're welcome to bring a friend or partner, most people come solo, and we highly recommend it. It's the best way to fully immerse yourself in the experience and connect with the group. On many trips, Kat's friends and siblings join too, and Kat is often there participating alongside the group.",
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
      "The best trips aren't defined by where you go, they're defined by who you experience them with. Every Shortsleeve itinerary is thoughtfully curated to balance adventure, connection, and authentic local experiences. We keep our groups intentionally small because the memories you'll cherish most often come from the people you meet along the way.",
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
