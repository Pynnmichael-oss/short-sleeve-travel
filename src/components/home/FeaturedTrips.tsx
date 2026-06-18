import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { trips } from '@/lib/trips'

export function FeaturedTrips() {
  return (
    <section className="bg-warmwhite py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4 mb-14">
          <SectionLabel className="text-sand">Upcoming Experiences</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal">
            Where are we going next?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {trips.map((trip) => (
            <article key={trip.id} className="flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={trip.image}
                  alt={`${trip.destination}, ${trip.country}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                {/* Destination tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-forest text-warmwhite text-xs uppercase tracking-widest px-3 py-1 font-body">
                    {trip.country}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <h3 className="font-display text-2xl text-charcoal leading-snug">
                  {trip.destination} — {trip.tagline}
                </h3>
                <p className="text-sm text-charcoal/50 font-body">
                  {trip.duration} days · Group of {trip.groupSize} · From ${trip.price.toLocaleString()}
                </p>
                <Link
                  href="/experiences"
                  className="text-sm text-forest underline underline-offset-4 hover:text-burnt transition-colors duration-200 mt-1"
                >
                  See This Trip →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/experiences"
            className="text-sm text-charcoal underline underline-offset-4 hover:text-burnt transition-colors duration-200"
          >
            View All Experiences
          </Link>
        </div>
      </div>
    </section>
  )
}
