import Link from 'next/link'
import type { Trip } from '@/types'

export function DepartureDates({ trip }: { trip: Trip }) {
  const dates = trip.departureDates ?? []

  return (
    <section className="bg-sst-surface py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-body text-xs uppercase tracking-widest text-sst-navy/40 mb-4">
            When to go
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-sst-navy">Departure dates.</h2>
        </div>

        {dates.length > 0 ? (
          <div className="flex flex-col divide-y divide-sst-navy/8">
            {dates.map((d) => (
              <div
                key={d._key}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-display text-xl text-sst-navy">
                    {d.startDate} — {d.endDate}
                  </p>
                  <p className="font-body text-sm text-sst-navy/50">
                    {trip.durationDays} days · ${d.price.toLocaleString()} per person
                    {trip.deposit ? ` · $${trip.deposit.toLocaleString()} deposit` : ''}
                  </p>
                </div>
                <a
                  href={trip.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 bg-sst-amber text-white text-xs font-body uppercase tracking-widest px-7 py-3 hover:bg-amber-600 transition-colors duration-200 text-center"
                >
                  Book Now
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-sst-navy/8">
            <p className="font-body text-sst-navy/60 text-sm mb-4">
              New dates coming soon — contact us to join the waitlist.
            </p>
            <Link
              href="/contact"
              className="text-sm font-body text-sst-nav underline underline-offset-4 hover:text-sst-amber transition-colors duration-200"
            >
              Get in touch →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
