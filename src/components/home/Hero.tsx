'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

// Rotation order per the hero rotation rebuild — each clip trimmed to ~1s
// around its best-scoring frame (see build script / conversation history for
// the KEEP/NEW slot mapping this order was derived from).
const HERO_CLIPS = [
  '/short-sleeve-travel/video/hero-01.mp4', // speedboat crossing water
  '/short-sleeve-travel/video/hero-02.mp4', // turquoise cove, paddleboarders
  '/short-sleeve-travel/video/hero-03.mp4', // people walking near water
  '/short-sleeve-travel/video/hero-04.mp4', // person walking in the rain on a road
  '/short-sleeve-travel/video/hero-05.mp4', // misty valley camp, tents + horses
  '/short-sleeve-travel/video/hero-06.mp4', // two people looking out at water
  '/short-sleeve-travel/video/hero-07.mp4', // group sitting on a boat
  '/short-sleeve-travel/video/hero-08.mp4', // hiker with a blue backpack
  '/short-sleeve-travel/video/hero-09.mp4', // mountain with water reflection
  '/short-sleeve-travel/video/hero-10.mp4', // desert dune, golden hour
]

// Clips are ~1s each now (not one long pre-rendered reel), so the rotation
// interval is sized to match — was previously tuned for a single ~34s video
// and doesn't apply here. A short crossfade keeps consecutive clips from
// hard-cutting into each other.
const ROTATE_MS = 1100
const CROSSFADE_MS = 350

// Two persistent <video> elements crossfaded via direct opacity/src control
// (no React state driving re-renders) rather than mounting all ten clips at
// once — keeps exactly two decoders alive at any time instead of ten, and
// resetting `currentTime` + replaying on every swap guarantees each clip
// always starts from its trimmed-in frame, not wherever a background loop
// happened to be.
function HeroRotation() {
  const refA = useRef<HTMLVideoElement>(null)
  const refB = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const a = refA.current
    const b = refB.current
    if (!a || !b) return

    let index = 0
    let topIsA = true
    a.style.opacity = '1'
    b.style.opacity = '0'
    a.play().catch(() => {})

    let timeoutId: ReturnType<typeof setTimeout>

    const advance = () => {
      index = (index + 1) % HERO_CLIPS.length
      const showing = topIsA ? b : a
      const hiding = topIsA ? a : b
      showing.src = HERO_CLIPS[index]
      showing.currentTime = 0
      showing.play().catch(() => {})
      showing.style.opacity = '1'
      hiding.style.opacity = '0'
      topIsA = !topIsA
      timeoutId = setTimeout(advance, ROTATE_MS)
    }

    timeoutId = setTimeout(advance, ROTATE_MS)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <>
      <video
        ref={refA}
        src={HERO_CLIPS[0]}
        muted
        loop
        playsInline
        preload="auto"
        poster="/short-sleeve-travel/images/hero-reel-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, transition: `opacity ${CROSSFADE_MS}ms ease-in-out` }}
      />
      <video
        ref={refB}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, transition: `opacity ${CROSSFADE_MS}ms ease-in-out` }}
      />
    </>
  )
}

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Full-bleed rotating video background */}
      <HeroRotation />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

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
