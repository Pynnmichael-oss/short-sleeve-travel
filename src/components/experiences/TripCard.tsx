import Image from 'next/image'
import Link from 'next/link'
import type { Trip } from '@/types'
import { urlFor } from '@/lib/sanity'

const FALLBACK_IMAGES: Record<string, string> = {
  'new-zealand-adventure': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
  'spirit-of-japan': 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
  'morocco-uncovered': 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800',
}

export function TripCard({ trip }: { trip: Trip }) {
  const imgSrc = trip.heroImage?.asset
    ? urlFor(trip.heroImage).width(800).height(576).url()
    : (FALLBACK_IMAGES[trip.slug.current] ?? '/short-sleeve-travel/images/placeholder.jpg')

  const highlights = trip.inclusions?.activities?.slice(0, 4) ?? []

  return (
    <article className="flex flex-col bg-white">
      {/* Image */}
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
          <span className="bg-sst-sand text-sst-navy text-xs uppercase tracking-widest px-3 py-1 font-body">
            {trip.region}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-7">
        <div>
          <p className="text-xs uppercase tracking-widest text-sst-navy/40 font-body mb-2">
            {trip.destination}
          </p>
          <h2 className="font-display text-2xl text-sst-navy leading-snug">
            {trip.tagline}
          </h2>
        </div>

        <p className="font-body text-sm text-sst-navy/60 leading-relaxed">
          {trip.description}
        </p>

        {/* Activity highlights */}
        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {highlights.map((h) => (
              <span key={h} className="text-xs font-body text-sst-nav bg-sst-nav/8 px-3 py-1">
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Info row */}
        <div className="flex items-center gap-2 text-sm font-body text-sst-navy/50 border-t border-sst-navy/8 pt-4 flex-wrap">
          <span>{trip.durationDays} days</span>
          <span className="text-sst-navy/20">·</span>
          <span className="text-sst-navy font-medium">
            From ${trip.priceFrom.toLocaleString()}
          </span>
        </div>

        <Link
          href={`/experiences/${trip.slug.current}`}
          className="mt-1 self-start bg-sst-amber text-white px-6 py-3 text-sm tracking-wide hover:bg-amber-600 transition-colors duration-200"
        >
          View Experience
        </Link>
      </div>
    </article>
  )
}
