import { TripCard } from './TripCard'
import type { Trip } from '@/types'

export function FilteredTrips({ trips }: { trips: Trip[] }) {
  return (
    <section className="bg-sst-surface py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        ) : (
          <p className="text-center font-body text-sst-navy/50 py-20">
            New adventures are being planned — check back soon.
          </p>
        )}
      </div>
    </section>
  )
}
