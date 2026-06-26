import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

interface PastTrip {
  _id: string
  title: string
  slug: { current: string }
  heroImage: any
  destination: string
  departureDates?: Array<{ startDate?: string }>
}

const PLACEHOLDER_CARDS = [
  {
    id: 'placeholder-prague',
    src: '/short-sleeve-travel/images/prague-streets.jpg',
    label: 'Prague, Czech Republic',
    year: '2024',
    slug: null,
  },
  {
    id: 'placeholder-india',
    src: '/short-sleeve-travel/images/india-palace-gate.jpg',
    label: 'Jaipur, India',
    year: '2024',
    slug: null,
  },
]

function getYear(trip: PastTrip): string {
  const date = trip.departureDates?.[0]?.startDate
  return date ? new Date(date).getFullYear().toString() : '2024'
}

export function PastTripsGrid({ trips }: { trips: PastTrip[] }) {
  const usePlaceholders = !trips || trips.length === 0

  return (
    <section className="bg-sst-surface py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="font-body text-xs tracking-widest uppercase text-sst-navy/40 mb-3">
            Past Trips
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-sst-navy">
            Every one of these changed someone.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {usePlaceholders
            ? PLACEHOLDER_CARDS.map(({ id, src, label, year }) => (
                <article key={id} className="group flex flex-col bg-sst-white overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={src}
                      alt={label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-col gap-1 px-6 py-5">
                    <p className="font-display text-lg text-sst-navy leading-snug">{label}</p>
                    <p className="font-body text-xs text-sst-navy/40 uppercase tracking-widest">{year}</p>
                  </div>
                </article>
              ))
            : trips.map((trip) => {
                const imgSrc = trip.heroImage?.asset
                  ? urlFor(trip.heroImage).width(700).height(500).url()
                  : '/short-sleeve-travel/images/placeholder.jpg'

                return (
                  <article key={trip._id} className="group flex flex-col bg-sst-white overflow-hidden">
                    <Link href={`/trips/${trip.slug.current}`} className="block">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={imgSrc}
                          alt={trip.destination}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-col gap-1 px-6 py-5">
                        <p className="font-display text-lg text-sst-navy leading-snug">{trip.destination}</p>
                        <p className="font-body text-xs text-sst-navy/40 uppercase tracking-widest">{getYear(trip)}</p>
                      </div>
                    </Link>
                  </article>
                )
              })}
        </div>
      </div>
    </section>
  )
}
