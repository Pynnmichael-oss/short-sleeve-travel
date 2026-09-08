import { Button } from '@/components/ui/Button'
import { GlobeMapWrapper } from '@/components/destinations/GlobeMapWrapper'
import type { GlobeTrip } from '@/components/destinations/GlobeMap'

export function FooterCTA({ globeTrips }: { globeTrips: GlobeTrip[] }) {
  return (
    <section className="bg-sst-surface">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-0 items-stretch">
        {/* Text — centered on mobile, left-aligned on desktop */}
        <div className="lg:col-span-2 flex flex-col justify-center items-center text-center lg:items-start lg:text-left gap-6 px-6 py-16 lg:py-24 md:lg:py-32">
          <h2 className="font-display text-4xl md:text-5xl text-sst-navy">
            Ready to go?
          </h2>
          <p className="font-body text-lg text-sst-navy/60 leading-relaxed">
            Your next adventure — and your next group of friends — is waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button href="/trips" variant="primary">
              See Experiences
            </Button>
            <Button href="/about" variant="outline">
              Learn About Us
            </Button>
          </div>
        </div>

        {/* Globe teaser */}
        <div className="lg:col-span-3 h-[360px] md:h-[420px] lg:h-full">
          <GlobeMapWrapper trips={globeTrips} variant="teaser" />
        </div>
      </div>
    </section>
  )
}
