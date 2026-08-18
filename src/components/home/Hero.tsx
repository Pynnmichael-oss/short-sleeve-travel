import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Full-bleed video background — single pre-baked file with the 10-clip
          rotation and crossfades (including the loop point) already rendered
          in, rather than driving the rotation live in the browser. */}
      <video
        src="/short-sleeve-travel/video/hero-rotation.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/short-sleeve-travel/images/hero-reel-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Scrim — gradient rather than flat opacity so it reads as intentional
          framing, not a muddy filter. Content here is vertically centered
          (items-center, not bottom-anchored), so the dark band is shaped to
          sit under the headline/CTA block (roughly the middle third of the
          viewport) rather than a naive light-top/dark-bottom ramp that would
          leave the actual text under the lightest part of the gradient. */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(26, 43, 60, 0.20) 0%,
            rgba(26, 43, 60, 0.55) 35%,
            rgba(26, 43, 60, 0.62) 60%,
            rgba(26, 43, 60, 0.50) 100%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center gap-6">
        <h1 className="font-display text-5xl md:text-7xl text-sst-white leading-tight">
          Adventure is better together.
        </h1>
        <p className="font-body text-lg md:text-xl text-sst-white/80 max-w-xl leading-relaxed">
          The travel club for people in their 20s and 30s. Small groups. Extraordinary adventures. Lifelong friendships.
        </p>
        <Link
          href="/trips"
          className="mt-2 bg-sst-amber text-white px-8 py-4 text-sm tracking-wide hover:bg-amber-600 transition-colors duration-200"
        >
          Explore Upcoming Trips
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <div className="w-5 h-8 border border-sst-white/40 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-sst-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
