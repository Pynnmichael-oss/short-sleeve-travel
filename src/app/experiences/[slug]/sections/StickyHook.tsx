'use client'

import type { Trip } from '@/types'

export function StickyHook({ trip }: { trip: Trip }) {
  return (
    <section className="bg-sst-surface py-24 md:py-36">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="font-body text-xs uppercase tracking-widest text-sst-navy/40 mb-8">
          The Experience
        </p>
        <span
          className="font-display text-sst-sand/30 leading-none select-none block"
          style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}
          aria-hidden="true"
        >
          &#8220;
        </span>
        <p
          className="font-display text-sst-navy -mt-4 leading-snug"
          style={{ fontSize: 'clamp(1.15rem, 2vw, 1.4rem)' }}
        >
          {trip.description}
        </p>
      </div>
    </section>
  )
}
