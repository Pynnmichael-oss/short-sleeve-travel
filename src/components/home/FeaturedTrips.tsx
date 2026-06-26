import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getFeaturedTrips } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

const FALLBACK_IMAGES: Record<string, string> = {
  'new-zealand-adventure': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
  'spirit-of-japan': 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
  'morocco-uncovered': 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800',
}

export async function FeaturedTrips() {
  const trips = await getFeaturedTrips()

  return (
    <section className="bg-sst-surface py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4 mb-14">
          <SectionLabel className="text-sst-sand">Upcoming Experiences</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-sst-navy">
            Where are we going next?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {trips.map((trip: any) => {
            const imgSrc = trip.heroImage?.asset
              ? urlFor(trip.heroImage).width(800).height(576).url()
              : (FALLBACK_IMAGES[trip.slug.current] ?? '/short-sleeve-travel/images/placeholder.jpg')

            return (
              <article key={trip._id} className="flex flex-col">
                <div className="relative h-72 overflow-hidden">
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={trip.destination}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-sst-nav text-sst-white text-xs uppercase tracking-widest px-3 py-1 font-body">
                      {trip.destination}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-6">
                  <h3 className="font-display text-2xl text-sst-navy leading-snug">
                    {trip.tagline}
                  </h3>
                  <p className="text-sm text-sst-navy/50 font-body">
                    {trip.durationDays} days · From ${trip.priceFrom.toLocaleString()}
                  </p>
                  <Link
                    href={`/trips/${trip.slug.current}`}
                    className="text-sm text-sst-nav underline underline-offset-4 hover:text-sst-amber transition-colors duration-200 mt-1"
                  >
                    See This Trip →
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/trips"
            className="text-sm text-sst-navy underline underline-offset-4 hover:text-sst-amber transition-colors duration-200"
          >
            View All Experiences
          </Link>
        </div>
      </div>
    </section>
  )
}
