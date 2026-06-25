import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

const FALLBACK_IMAGES: Record<string, string> = {
  'new-zealand-adventure': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
  'spirit-of-japan': 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
  'morocco-uncovered': 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800',
}

interface UpcomingTrip {
  _id: string
  title: string
  slug: { current: string }
  tagline: string
  heroImage: any
  durationDays: number
  priceFrom: number
  destination: string
  region: string
}

export function UpcomingTrips({ trips }: { trips: UpcomingTrip[] }) {
  if (!trips || trips.length === 0) return null

  return (
    <section className="bg-sst-nav py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4 mb-14">
          <p className="font-body text-xs uppercase tracking-widest text-sst-sand/70">
            On the Horizon
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-sst-white">
            Where We&apos;re Going Next
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trips.map((trip) => {
            const imgSrc = trip.heroImage?.asset
              ? urlFor(trip.heroImage).width(800).height(576).url()
              : (FALLBACK_IMAGES[trip.slug.current] ?? '/short-sleeve-travel/images/placeholder.jpg')

            return (
              <article key={trip._id} className="flex flex-col bg-sst-navy">
                <div className="relative h-60 overflow-hidden">
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={trip.destination}
                      fill
                      className="object-cover opacity-70 hover:opacity-90 transition-opacity duration-500"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-sst-sand text-sst-navy text-xs uppercase tracking-widest px-3 py-1 font-body">
                      {trip.region}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-7">
                  <p className="font-body text-xs uppercase tracking-widest text-sst-sand/70">
                    {trip.destination}
                  </p>
                  <h3 className="font-display text-2xl text-sst-white leading-snug">
                    {trip.tagline}
                  </h3>
                  <p className="font-body text-sm text-sst-white/50">
                    {trip.durationDays} days · From ${trip.priceFrom.toLocaleString()}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-2 self-start bg-sst-amber text-white text-xs font-body uppercase tracking-widest px-6 py-3 hover:bg-amber-600 transition-colors duration-200"
                  >
                    Join the Waitlist
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
