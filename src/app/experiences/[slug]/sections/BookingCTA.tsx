import type { Trip } from '@/types'

export function BookingCTA({ trip }: { trip: Trip }) {
  return (
    <section className="bg-forest py-28">
      <div className="max-w-lg mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-offwhite leading-tight">
          Ready for {trip.destination}?
        </h2>
        <p className="font-body text-offwhite/50 mt-4 text-sm leading-relaxed">
          Spots are limited to {trip.groupSize} people. Reserve yours before they&apos;re gone.
        </p>

        <form
          className="mt-10 flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-white/10 border border-offwhite/20 text-offwhite placeholder:text-offwhite/30 px-5 py-4 font-body text-sm focus:outline-none focus:border-sand/60 transition-colors duration-200"
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full bg-white/10 border border-offwhite/20 text-offwhite placeholder:text-offwhite/30 px-5 py-4 font-body text-sm focus:outline-none focus:border-sand/60 transition-colors duration-200"
          />
          <button
            type="submit"
            className="w-full bg-burnt text-warmwhite py-4 font-body text-sm uppercase tracking-widest hover:bg-burnt/90 transition-colors duration-200 mt-2"
          >
            Reserve My Spot
          </button>
        </form>

        <p className="font-body text-xs text-offwhite/25 mt-6 leading-relaxed">
          No payment required to reserve. We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    </section>
  )
}
