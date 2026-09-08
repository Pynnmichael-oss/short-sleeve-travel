import { Button } from '@/components/ui/Button'
import { GlobeMapWrapper } from '@/components/destinations/GlobeMapWrapper'
import type { GlobeTrip } from '@/components/destinations/GlobeMap'

export function FooterCTA({ globeTrips }: { globeTrips: GlobeTrip[] }) {
  return (
    <section className="bg-sst-surface">
      <div className="relative lg:max-w-6xl lg:mx-auto lg:grid lg:grid-cols-5 lg:gap-0 lg:items-stretch">
        {/* Globe — mobile: full-bleed background filling the section.
            Desktop: right-hand grid column, unchanged from before. */}
        <div className="h-[520px] sm:h-[560px] lg:h-full lg:col-start-3 lg:col-span-3">
          <GlobeMapWrapper trips={globeTrips} variant="teaser" />
        </div>

        {/* Text — mobile: absolutely centered over the globe in a frosted card.
            Desktop: left-hand grid column, unchanged from before (hidden here). */}
        <div className="absolute inset-0 flex items-center justify-center px-6 lg:hidden">
          <div className="bg-sst-surface/85 backdrop-blur-sm rounded-2xl px-6 py-8 flex flex-col items-center text-center gap-6 max-w-sm">
            <h2 className="font-display text-4xl text-sst-navy">Ready to go?</h2>
            <p className="font-body text-base text-sst-navy/70 leading-relaxed">
              Your next adventure — and your next group of friends — is waiting.
            </p>
            <div className="flex flex-col gap-4 w-full">
              <Button href="/trips" variant="primary">
                See Experiences
              </Button>
              <Button href="/about" variant="outline">
                Learn About Us
              </Button>
            </div>
          </div>
        </div>

        {/* Text — desktop only, original layout, untouched styling */}
        <div className="hidden lg:flex lg:col-start-1 lg:col-span-2 flex-col justify-center items-start text-left gap-6 px-6 py-24 md:py-32">
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
      </div>
    </section>
  )
}
