import Image from 'next/image'
import Link from 'next/link'

export function CommunityCloser() {
  return (
    <section className="relative py-32 md:py-48">
      <Image
        src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1600"
        alt="Group of friends hiking together"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-sst-navy/65" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-10">
        <p className="font-display text-4xl md:text-5xl text-sst-white italic leading-snug">
          "Shortsleeve Travel is a one-of-a-kind travel club for people in their
          20s and 30s seeking extraordinary experiences and like-minded
          connections."
        </p>
        <Link
          href="/trips"
          className="bg-sst-amber text-white px-8 py-4 text-sm tracking-wide hover:bg-amber-600 transition-colors duration-200"
        >
          See What's Coming Up
        </Link>
      </div>
    </section>
  )
}
