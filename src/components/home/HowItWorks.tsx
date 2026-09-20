const blocks = [
  {
    eyebrow: 'The Club',
    title: 'What We Do',
    body: "Shortsleeve Travel is a one-of-a-kind travel club for people seeking extraordinary experiences and like-minded connections. Whether it's trekking remote mountains in South America, cruising on private yachts, creating custom clothes in Vietnam, skiing and après in the Alps, taking a sushi-making class in Japan, yachting through Croatia, hiking Machu Picchu, or exploring Europe by Eurorail, we elevate adventure travel with small, curated groups and unforgettable experiences. Everyone who joins our trips leaves with a new community of friends they continue to travel with long after the adventure ends.",
  },
  {
    eyebrow: 'The Travelers',
    title: 'Who Joins Us',
    body: "Our travelers come from all walks of life—consultants, entrepreneurs, doctors, lawyers, nurses, finance professionals, and creatives. Most join solo, but we've had friends, siblings, and couples join too. What unites everyone is the desire to explore the world in ways that are truly out of the ordinary and exceptional.",
  },
  {
    eyebrow: 'The Difference',
    title: "Why We're Different",
    body: 'Unlike typical group trips, Shortsleeve Travel focuses on high-end adventure and unique experience. It\'s about meeting like-minded people and creating authentic, life-changing experiences. Our travelers want to have fun, connect, and explore in a meaningful way.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-sst-sand/15 py-24 md:py-36" aria-labelledby="community-heading">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          id="community-heading"
          className="font-display text-4xl md:text-6xl text-sst-navy leading-tight mb-16 md:mb-24"
        >
          Travel with a Community
        </h2>

        <div className="flex flex-col">
          {blocks.map(({ eyebrow, title, body }, i) => {
            // Alternate sides on desktop so the blocks stagger like a magazine
            // spread; on mobile everything stacks (heading first).
            const flip = i % 2 === 1
            return (
              <article
                key={title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6 border-t border-sst-sand/50 py-12 md:py-16 lg:py-20"
              >
                <div
                  className={`lg:col-span-4 ${flip ? 'lg:col-start-9 lg:row-start-1' : 'lg:col-start-1'}`}
                >
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-sst-burnt mb-4">
                    {eyebrow}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl text-sst-navy leading-snug">
                    {title}
                  </h3>
                </div>
                <p
                  className={`font-body text-lg leading-relaxed text-sst-body max-w-[62ch] lg:col-span-7 ${
                    flip ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-6'
                  }`}
                >
                  {body}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
