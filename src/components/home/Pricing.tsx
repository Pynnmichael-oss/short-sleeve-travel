import { SectionLabel } from '@/components/ui/SectionLabel'

export function Pricing() {
  return (
    <section className="bg-sst-surface py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-6 flex flex-col gap-5">
        <SectionLabel className="text-sst-sand">Pricing</SectionLabel>
        <p className="font-body text-lg text-sst-navy/70 leading-relaxed">
          Our trips range from{' '}
          <span className="text-sst-amber font-medium">$1,000 to $3,000 per person</span>,
          with everything taken care of — from accommodations to itinerary planning.
          All you have to do is show up.
        </p>
      </div>
    </section>
  )
}
