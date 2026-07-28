'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { Hero } from '@/components/home/Hero'

interface HeroReelImageItem {
  _type: 'heroReelImage'
  photo?: { image: any; alt?: string; caption?: string }
}

interface HeroReelVideoItem {
  _type: 'heroReelVideo'
  asset?: { url: string }
  alt?: string
  poster?: { image: any; alt?: string }
}

type HeroReelItem = HeroReelImageItem | HeroReelVideoItem

// Rotation stays on a fixed interval for both images and videos rather than
// waiting for a video clip to finish a loop — simpler to reason about, and
// keeps pacing consistent regardless of clip length. Revisit if clips need
// to guarantee at least one full playthrough.
const ROTATE_MS = 4000

// Mobile full-bleed copy block — unchanged from the original split-hero pass.
function HeroCopy({ align }: { align: 'left' | 'center' }) {
  const wrap = align === 'left' ? 'items-start text-left' : 'items-center text-center'
  return (
    <div className={`relative z-10 flex flex-col gap-6 ${wrap}`}>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-sst-white leading-tight">
        Adventure is better together.
      </h1>
      <p className="font-body text-lg md:text-xl text-sst-white/80 max-w-xl leading-relaxed">
        The travel club for your 20s and 30s. Small groups. Big adventures. Lifelong friends.
      </p>
      <Link
        href="/trips"
        className="mt-2 bg-sst-amber text-white px-8 py-4 text-sm tracking-wide hover:bg-amber-600 transition-colors duration-200"
      >
        See Our Trips
      </Link>
    </div>
  )
}

// Desktop/tablet copy block — same headline/subhead/CTA copy as HeroCopy,
// with an eyebrow label and tighter internal spacing so the block reads as
// one unit next to the framed media panel.
function HeroCopyDesktop() {
  return (
    <div className="relative z-10 flex flex-col items-start text-left gap-3">
      <span className="font-body text-xs tracking-[0.2em] uppercase text-sst-sand">
        Small Group Adventure Travel
      </span>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-sst-white leading-tight">
        Adventure is better together.
      </h1>
      <p className="font-body text-lg md:text-xl text-sst-white/80 max-w-xl leading-relaxed">
        The travel club for your 20s and 30s. Small groups. Big adventures. Lifelong friends.
      </p>
      <Link
        href="/trips"
        className="mt-3 bg-sst-amber text-white px-8 py-4 text-sm tracking-wide hover:bg-amber-600 transition-colors duration-200"
      >
        See Our Trips
      </Link>
    </div>
  )
}

// Renders one reel slot, branching on the Sanity `_type` discriminant.
// Used by the mobile full-bleed layout only — kept exactly as originally
// built (eagerly mounts every reel item, toggling opacity). The desktop
// carousel below uses its own, more selective media components instead.
function ReelSlot({ item, active, priority }: { item: HeroReelItem; active: boolean; priority: boolean }) {
  if (item._type === 'heroReelVideo') {
    const src = item.asset?.url
    if (!src) return null
    return (
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out" style={{ opacity: active ? 1 : 0 }}>
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          aria-label={item.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    )
  }

  const imgSrc = item.photo?.image?.asset ? urlFor(item.photo.image).width(1200).height(2133).url() : null
  if (!imgSrc) return null

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700 ease-in-out"
      style={{ opacity: active ? 1 : 0 }}
    >
      <Image
        src={imgSrc}
        alt={item.photo?.alt ?? ''}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 480px"
        priority={priority}
      />
    </div>
  )
}

// ── Desktop/tablet 3-slot carousel ──────────────────────────────────────
// These components are only ever mounted for the current active/prev/next
// indices — never for the rest of the reel array — so media loading stays
// bounded regardless of how many items are in heroReel.

// Centered slot. Video items actually play (muted/looped); preload is
// "metadata" rather than "auto" since this is background content, not
// something a visitor scrubs.
function ActiveMedia({ item }: { item: HeroReelItem }) {
  if (item._type === 'heroReelVideo') {
    const src = item.asset?.url
    if (!src) return null
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={item.alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    )
  }

  const imgSrc = item.photo?.image?.asset ? urlFor(item.photo.image).width(700).height(1244).url() : null
  if (!imgSrc) return null
  return (
    <Image
      src={imgSrc}
      alt={item.photo?.alt ?? ''}
      fill
      loading="lazy"
      className="object-cover"
      sizes="(max-width: 1024px) 260px, 320px"
    />
  )
}

// Peeking prev/next slot. Always a static image — a video item shows its
// `poster` still (never mounts a <video>), falling back to a solid
// brand-color block if no poster has been uploaded yet.
function PeekMedia({ item }: { item: HeroReelItem }) {
  const posterOrPhoto = item._type === 'heroReelVideo' ? item.poster?.image : item.photo?.image
  const alt = item._type === 'heroReelVideo' ? (item.poster?.alt ?? item.alt ?? '') : (item.photo?.alt ?? '')
  const imgSrc = posterOrPhoto?.asset ? urlFor(posterOrPhoto).width(500).height(889).url() : null

  if (!imgSrc) return <div className="absolute inset-0 bg-sst-navy" />

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      loading="lazy"
      className="object-cover"
      sizes="260px"
    />
  )
}

const CROSSFADE_MS = 700

// Wraps a carousel position (prev/active/next) so swapping to a new item
// crossfades instead of cutting instantly. Only ever holds the current
// item plus the one it's transitioning away from — the outgoing layer
// unmounts once the fade finishes, so this never accumulates media for
// items outside the current position.
function CrossfadeSlot({ item, render }: { item: HeroReelItem; render: (item: HeroReelItem) => React.ReactNode }) {
  const [outgoing, setOutgoing] = useState<HeroReelItem | null>(null)
  const prevItemRef = useRef(item)

  useEffect(() => {
    if (prevItemRef.current !== item) {
      setOutgoing(prevItemRef.current)
      prevItemRef.current = item
      const t = setTimeout(() => setOutgoing(null), CROSSFADE_MS)
      return () => clearTimeout(t)
    }
  }, [item])

  return (
    <>
      {outgoing && (
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out opacity-0">
          {render(outgoing)}
        </div>
      )}
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out opacity-100">
        {render(item)}
      </div>
    </>
  )
}

export function HeroSplit({ heroReel }: { heroReel?: HeroReelItem[] }) {
  const reel = (heroReel ?? []).filter((item) =>
    item?._type === 'heroReelVideo' ? !!item.asset?.url : !!item?.photo?.image?.asset
  )
  const n = reel.length
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (n < 2) return
    intervalRef.current = setInterval(() => setActive((p) => (p + 1) % n), ROTATE_MS)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [n])

  if (n === 0) {
    // No hero reel configured in Sanity yet — fall back to the existing static Hero.
    return <Hero />
  }

  const prevIndex = (active - 1 + n) % n
  const nextIndex = (active + 1) % n
  const hasPeers = n > 1 // with exactly 2 items, prev and next both point at the same other item — expected

  return (
    <section className="relative overflow-hidden">
      {/* ── Mobile: full-bleed reel with bottom gradient + overlaid copy ── */}
      <div className="md:hidden relative h-screen">
        {reel.map((item, i) => (
          <ReelSlot key={i} item={item} active={i === active} priority={i === 0} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12">
          <HeroCopy align="left" />
        </div>
      </div>

      {/* ── Desktop/tablet: two-column split, centered in a 1280px container.
          The media side is a 3-slot carousel: a centered, bordered active
          item with the previous/next items peeking at reduced scale/opacity
          on either side, clipped by the stage's overflow-hidden. Only the
          active/prev/next indices are ever mounted. ── */}
      <div className="hidden md:block bg-sst-nav">
        <div className="max-w-[1280px] mx-auto px-8 lg:px-16 py-20 lg:py-24 flex items-center gap-12 lg:gap-20">
          <div className="flex-1 min-w-0">
            <HeroCopyDesktop />
          </div>

          <div className="w-full max-w-[380px] flex flex-col items-center gap-5 shrink-0">
            <div className="relative w-full aspect-[9/16] overflow-hidden">
              {hasPeers && (
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-700 ease-in-out"
                  style={{ transform: 'translateX(-62%) scale(0.82)', opacity: 0.4, zIndex: 1 }}
                >
                  <CrossfadeSlot item={reel[prevIndex]} render={(item) => <PeekMedia item={item} />} />
                </div>
              )}

              <div
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-sst-white/25 transition-transform duration-700 ease-in-out"
                style={{ transform: 'translateX(0) scale(1)', zIndex: 2 }}
              >
                <CrossfadeSlot item={reel[active]} render={(item) => <ActiveMedia item={item} />} />
              </div>

              {hasPeers && (
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-700 ease-in-out"
                  style={{ transform: 'translateX(62%) scale(0.82)', opacity: 0.4, zIndex: 1 }}
                >
                  <CrossfadeSlot item={reel[nextIndex]} render={(item) => <PeekMedia item={item} />} />
                </div>
              )}
            </div>

            {hasPeers && (
              <div className="flex justify-center gap-2">
                {reel.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      i === active ? 'bg-sst-amber' : 'bg-sst-white/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
