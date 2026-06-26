import type { Trip } from '@/types'

export function BookingCTA({ trip }: { trip: Trip }) {
  return (
    <section className="bg-sst-nav py-28">
      <div className="max-w-lg mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-sst-white leading-tight">
          Ready for {trip.destination}?
        </h2>
        <p className="font-body text-sst-white/50 mt-4 text-sm leading-relaxed">
          Spots fill fast. Secure your place with a ${trip.deposit?.toLocaleString() ?? '280'} deposit.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={trip.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-sm bg-sst-amber text-white py-4 font-body text-sm uppercase tracking-widest hover:bg-amber-600 transition-colors duration-200 text-center block"
          >
            Check Dates &amp; Book
          </a>
          <p className="font-body text-xs text-sst-white/25 leading-relaxed">
            You&apos;ll be taken to our booking partner TruTravels to complete your reservation.
          </p>
        </div>
      </div>
    </section>
  )
}
