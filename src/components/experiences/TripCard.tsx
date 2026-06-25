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
          <span className="bg-sst-sand text-sst-navy text-xs uppercase tracking-widest px-3 py-1 font-body">
            {trip.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-7">
        <div>
          <p className="text-xs uppercase tracking-widest text-sst-navy/40 font-body mb-2">
            {trip.destination}, {trip.country}
          </p>
          <h2 className="font-display text-2xl text-sst-navy leading-snug">
            {trip.tagline}
          </h2>
        </div>

        <p className="font-body text-sm text-sst-navy/60 leading-relaxed">
          {trip.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2">
          {trip.highlights.map((h) => (
            <span
              key={h}
              className="text-xs font-body text-sst-nav bg-sst-nav/8 px-3 py-1"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Info row */}
        <div className="flex items-center gap-2 text-sm font-body text-sst-navy/50 border-t border-sst-navy/8 pt-4 flex-wrap">
          <span>{trip.duration} days</span>
          <span className="text-sst-navy/20">·</span>
          <span>{trip.groupSize} people max</span>
          <span className="text-sst-navy/20">·</span>
          <span className="text-sst-navy font-medium">
            From ${trip.price.toLocaleString()}
          </span>
        </div>

        <Link
          href={`/experiences/${trip.slug}`}
          className="mt-1 self-start bg-sst-amber text-white px-6 py-3 text-sm tracking-wide hover:bg-amber-600 transition-colors duration-200"
        >
          View Experience
        </Link>
      </div>
    </article>
  )
}
