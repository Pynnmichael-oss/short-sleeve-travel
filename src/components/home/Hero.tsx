import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      <Image
        src="/short-sleeve-travel/images/group-boat.jpg"
        alt="Group of travellers on a boat deck"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-sst-nav/55" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center gap-6">
        <h1 className="font-display text-5xl md:text-7xl text-sst-white leading-tight">
          Adventure is better together.
        </h1>
        <p className="font-body text-lg md:text-xl text-sst-white/80 max-w-xl leading-relaxed">
          Group travel for people who want to actually show up.
        </p>
        <Link
          href="/trips"
          className="mt-2 bg-sst-amber text-white px-8 py-4 text-sm tracking-wide hover:bg-amber-600 transition-colors duration-200"
        >
          See Our Trips
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <div className="w-5 h-8 border border-sst-white/40 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-sst-surface/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
