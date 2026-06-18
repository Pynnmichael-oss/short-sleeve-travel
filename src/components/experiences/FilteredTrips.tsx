'use client'

import { useState } from 'react'
import { trips } from '@/lib/trips'
import { TripCard } from './TripCard'
import type { TripCategory } from '@/types'

type Filter = 'All' | TripCategory

const filters: Filter[] = ['All', 'Hiking', 'Cultural', 'Beach & Islands']

export function FilteredTrips() {
  const [active, setActive] = useState<Filter>('All')

  const visible =
    active === 'All' ? trips : trips.filter((t) => t.category === active)

  return (
    <>
      {/* Filter bar */}
      <div className="bg-offwhite border-b border-charcoal/8 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={
                active === f
                  ? 'px-5 py-2 text-sm font-body bg-burnt text-warmwhite transition-colors duration-200'
                  : 'px-5 py-2 text-sm font-body border border-charcoal text-charcoal hover:border-burnt hover:text-burnt transition-colors duration-200'
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Trip grid */}
      <section className="bg-warmwhite py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {visible.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {visible.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <p className="text-center font-body text-charcoal/50 py-20">
              No trips in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
