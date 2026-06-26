import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function Pricing() {
  return (
    <section className="bg-sst-surface py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
        <SectionLabel className="text-sst-sand">Pricing</SectionLabel>
        <h2 className="font-display text-3xl md:text-4xl text-sst-navy leading-tight">
          Everything taken care of.
        </h2>
        <p className="font-body text-lg text-sst-navy/70 leading-relaxed">
          Our trips range from{' '}
          <span className="text-sst-amber font-medium">$1,000 to $3,000 per person</span>,
          with everything taken care of — from accommodations to itinerary planning.
          All you have to do is relax and enjoy.
        </p>
        <div className="mt-2">
          <Link
            href="/trips"
            className="inline-block bg-sst-amber text-white px-8 py-4 text-sm tracking-wide hover:bg-amber-600 transition-colors duration-200"
          >
            See Our Trips
          </Link>
        </div>
      </div>
    </section>
  )
}
