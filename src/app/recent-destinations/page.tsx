import Link from 'next/link'
import { GlobeMapWrapper } from '@/components/destinations/GlobeMapWrapper'
import { DestStatsBar } from '@/components/destinations/DestStatsBar'
import { DestTripCards } from '@/components/destinations/DestTripCards'

export const metadata = {
  title: 'Recent Destinations | Short Sleeve Travel',
  description:
    'Three trips. Thirty-three travelers. Stories that are still being told.',
}

export default function RecentDestinationsPage() {
  return (
    <main>
      {/* Section 1 — Page Header */}
      <section className="bg-sst-navy pt-32 pb-20 px-6 text-center">
        <p className="font-body text-xs tracking-widest uppercase text-sst-sand/60 mb-5">
          Where We&apos;ve Been
        </p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-sst-white leading-tight mb-6">
          Recent Destinations
        </h1>
        <p className="font-body text-lg text-sst-white/70 max-w-md mx-auto leading-relaxed">
          Three trips. Thirty-three travelers. Stories that are still being
          told.
        </p>
      </section>

      {/* Section 2 — Interactive Globe */}
      <GlobeMapWrapper />

      {/* Section 3 — Stats Bar */}
      <DestStatsBar />

      {/* Section 4 — Past Trip Cards */}
      <DestTripCards />

      {/* Section 5 — Bottom CTA */}
      <section className="bg-sst-navy py-24 px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-sst-white mb-5">
          The next destination is being planned now.
        </h2>
        <p className="font-body text-lg text-sst-white/60 mb-10 max-w-sm mx-auto">
          Be part of the next chapter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/experiences"
            className="font-body text-sm bg-sst-amber text-white px-8 py-4 hover:bg-amber-600 transition-colors duration-200 tracking-wide"
          >
            See Upcoming Trips
          </Link>
          <Link
            href="/contact"
            className="font-body text-sm border border-sst-white/50 text-sst-white px-8 py-4 hover:border-sst-white hover:text-sst-white transition-colors duration-200 tracking-wide"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </main>
  )
}
