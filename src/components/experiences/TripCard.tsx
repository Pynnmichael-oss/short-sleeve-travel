import Image from 'next/image'
import Link from 'next/link'
import type { Trip } from '@/types'

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <article className="flex flex-col bg-white">
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={trip.image}
          alt={`${trip.destination}, ${trip.country}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-sand text-charcoal text-xs uppercase tracking-widest px-3 py-1 font-body">
            {trip.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-7">
        <div>
          <p className="text-xs uppercase tracking-widest text-charcoal/40 font-body mb-2">
            {trip.destination}, {trip.country}
          </p>
          <h2 className="font-display text-2xl text-charcoal leading-snug">
            {trip.tagline}
          </h2>
        </div>

        <p className="font-body text-sm text-charcoal/60 leading-relaxed">
          {trip.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2">
          {trip.highlights.map((h) => (
            <span
              key={h}
              className="text-xs font-body text-forest bg-forest/8 px-3 py-1"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Info row */}
        <div className="flex items-center gap-2 text-sm font-body text-charcoal/50 border-t border-charcoal/8 pt-4 flex-wrap">
          <span>{trip.duration} days</span>
          <span className="text-charcoal/20">·</span>
          <span>{trip.groupSize} people max</span>
          <span className="text-charcoal/20">·</span>
          <span className="text-charcoal font-medium">
            From ${trip.price.toLocaleString()}
          </span>
        </div>

        <Link
          href={`/experiences/${trip.slug}`}
          className="mt-1 self-start bg-burnt text-warmwhite px-6 py-3 text-sm tracking-wide hover:bg-burnt/90 transition-colors duration-200"
        >
          View Experience
        </Link>
      </div>
    </article>
  )
}
