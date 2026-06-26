'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

const FALLBACK_IMAGES: Record<string, string> = {
  'new-zealand-adventure': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200',
  'spirit-of-japan': 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200',
  'morocco-uncovered': 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200',
}

interface PastTrip {
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

function TripCard({ trip, index }: { trip: PastTrip; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const imageRight = index % 2 !== 0
  const darkBg = index % 2 === 0

  const imgSrc = trip.heroImage?.asset
    ? urlFor(trip.heroImage).width(1200).url()
    : (FALLBACK_IMAGES[trip.slug.current] ?? '/short-sleeve-travel/images/placeholder.jpg')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const imageEl = (
    <div className="relative md:w-[45%] w-full h-72 md:h-auto overflow-hidden flex-shrink-0">
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={trip.destination}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      )}
    </div>
  )

  const contentEl = (
    <div className={`md:flex-1 flex flex-col justify-center px-10 py-12 md:py-16 ${darkBg ? 'bg-sst-nav' : 'bg-sst-white'}`}>
      <p className={`font-body text-xs tracking-widest mb-5 ${darkBg ? 'text-sst-sand/70' : 'text-sst-navy/50'}`}>
        COMPLETED · {trip.durationDays} DAYS
      </p>

      <h3 className={`font-display text-3xl md:text-4xl leading-tight mb-2 ${darkBg ? 'text-sst-white' : 'text-sst-navy'}`}>
        {trip.title}
      </h3>

      <p className={`font-body text-sm mb-6 ${darkBg ? 'text-sst-sand' : 'text-sst-navy/60'}`}>
        {trip.destination}
      </p>

      <p className={`font-body text-base leading-relaxed mb-8 max-w-md ${darkBg ? 'text-sst-white/80' : 'text-sst-navy/80'}`}>
        {trip.tagline}
      </p>

      <Link
        href={`/trips/${trip.slug.current}`}
        className="font-body text-sm text-sst-amber hover:text-amber-600 transition-colors duration-200 tracking-wide uppercase"
      >
        Read About This Trip &rarr;
      </Link>
    </div>
  )

  return (
    <article
      ref={ref}
      className={`flex flex-col md:flex-row transition-all duration-700 ${imageRight ? 'md:flex-row-reverse' : ''} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {imageEl}
      {contentEl}
    </article>
  )
}

export function DestTripCards({ trips }: { trips: PastTrip[] }) {
  if (!trips || trips.length === 0) return null

  return (
    <section className="bg-sst-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8 text-center">
        <p className="font-body text-xs tracking-widest uppercase text-sst-navy/50 mb-4">
          The Trips
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-sst-navy">
          Every one of these changed someone.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto mt-12 flex flex-col gap-0">
        {trips.map((trip, i) => (
          <TripCard key={trip._id} trip={trip} index={i} />
        ))}
      </div>
    </section>
  )
}
