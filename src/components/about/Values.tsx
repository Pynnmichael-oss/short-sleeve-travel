import { SectionLabel } from '@/components/ui/SectionLabel'

const values = [
  {
    name: 'Curated',
    description:
      'Every destination, every activity, every accommodation is chosen with intention. Nothing is on the itinerary just to fill time.',
  },
  {
    name: 'Community',
    description:
      'You will leave every Short Sleeve trip with people you actually want to stay in touch with. We design for connection, not just sightseeing.',
  },
  {
    name: 'Honest',
    description:
      "We tell you exactly what a trip costs, what it involves, and who it's right for. No hidden fees, no misleading photography, no surprises.",
  },
]

export function Values() {
  return (
    <section className="bg-forest py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4 mb-16">
          <SectionLabel className="text-sand">What we believe</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-offwhite">
            Three things we never compromise on.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {values.map(({ name, description }) => (
            <div key={name} className="flex flex-col gap-4">
              <h3 className="font-display text-3xl text-sand italic">{name}</h3>
              <p className="font-body text-offwhite/65 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
