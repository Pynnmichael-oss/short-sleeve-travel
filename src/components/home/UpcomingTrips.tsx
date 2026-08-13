import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { SectionLabel } from '@/components/ui/SectionLabel'

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
  priceFrom: number | null
  region: string
}

export function UpcomingTrips({ trips }: { trips: UpcomingTrip[] }) {
  if (!trips || trips.length === 0) return null

  return (
    <section className="bg-sst-surface py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4 mb-14">
          <SectionLabel className="text-sst-sand">On the Horizon</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-sst-navy">
            Where We&apos;re Going Next
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trips.map((trip) => {
            const imgSrc = trip.heroImage?.image?.asset
              ? urlFor(trip.heroImage.image).width(800).height(576).url()
              : (FALLBACK_IMAGES[trip.slug.current] ?? '/short-sleeve-travel/images/placeholder.jpg')

            return (
              <Link
                key={trip._id}
                href={`/trips/${trip.slug.current}`}
                className="group flex flex-col bg-white transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-60 overflow-hidden">
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={trip.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-sst-sand text-sst-navy text-xs uppercase tracking-widest px-3 py-1 font-body">
                      {trip.region}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-7">
                  <p className="font-body text-xs uppercase tracking-widest text-sst-sand">
                    {trip.title}
                  </p>
                  <h3 className="font-display text-2xl text-sst-navy leading-snug">
                    {trip.tagline}
                  </h3>
                  <p className="font-body text-sm text-sst-navy/60">
                    {trip.priceFrom
                      ? `From $${trip.priceFrom.toLocaleString()}`
                      : 'Price TBD'}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
