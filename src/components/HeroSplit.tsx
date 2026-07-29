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
        The travel club for people in their 20s and 30s. Small groups. Extraordinary adventures. Lifelong friendships.
      </p>
      <Link
        href="/trips"
        className="mt-2 bg-sst-amber text-white px-8 py-4 text-sm tracking-wide hover:bg-amber-600 transition-colors duration-200"
      >
        Explore Upcoming Trips
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
        The travel club for people in their 20s and 30s. Small groups. Extraordinary adventures. Lifelong friendships.
      </p>
      <Link
        href="/trips"
        className="mt-3 bg-sst-amber text-white px-8 py-4 text-sm tracking-wide hover:bg-amber-600 transition-colors duration-200"
      >
        Explore Upcoming Trips
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
      sizes="240px"
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

  // sst-sand rather than a darker navy: at 0.4 opacity against the section's
  // bg-sst-nav backdrop, a dark placeholder is nearly indistinguishable from
  // the background — this needs to read as a visible block with no poster.
  if (!imgSrc) return <div className="absolute inset-0 bg-sst-sand" />

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      loading="lazy"
      className="object-cover"
      sizes="240px"
    />
  )
}

const TRANSITION_MS = 600 // slide + opacity transition duration; also gates when the
// newly-centered item swaps from its static peek look to the live, autoplaying
// <video> — the video "restarts cleanly once settled" rather than starting
// mid-slide (see HeroSplit's `isTransitioning`).

const SLOT_W = 240 // px — each slot's box width; height follows from aspect-ratio 9:16
const SLOT_H = Math.round((SLOT_W * 16) / 9)
const STAGE_W = 560 // px — wide enough that peek slots read as mostly visible and the
// off-canvas "entering" slot (offset 2) is fully clipped until it slides inward
const STEP = 190 // px — horizontal offset per position step (estimate; a visual pass
// may want to tune this against the real 9:16 footage)

// Renders one item at a signed offset from center (-2..2: exit-buffer, prev,
// active, next, entry-buffer). Position/scale/opacity are driven by inline
// style plus a CSS transition, and the item is keyed by its own *virtual
// carousel position* (see HeroSplit) rather than by a "prev/active/next"
// role — so advancing the carousel just changes an existing DOM node's
// style (offset 1 -> 0, 0 -> -1, etc.), and the browser animates a real
// slide instead of swapping content in place.
function SlidingSlot({
  item,
  offset,
  showActiveMedia,
}: {
  item: HeroReelItem
  offset: number
  showActiveMedia: boolean
}) {
  const visible = offset >= -1 && offset <= 1
  const scale = offset === 0 ? 1 : 0.82
  const opacity = offset === 0 ? 1 : visible ? 0.4 : 0
  const zIndex = offset === 0 ? 2 : visible ? 1 : 0

  return (
    <div
      className={`absolute top-1/2 left-1/2 rounded-2xl overflow-hidden ${
        offset === 0 ? 'shadow-2xl ring-1 ring-sst-white/25' : ''
      }`}
      style={{
        width: SLOT_W,
        aspectRatio: '9/16',
        transform: `translate(-50%, -50%) translateX(${offset * STEP}px) scale(${scale})`,
        opacity,
        zIndex,
        transition: `transform ${TRANSITION_MS}ms ease-out, opacity ${TRANSITION_MS}ms ease-out`,
      }}
    >
      {showActiveMedia ? <ActiveMedia item={item} /> : <PeekMedia item={item} />}
    </div>
  )
}

export function HeroSplit({ heroReel }: { heroReel?: HeroReelItem[] }) {
  const reel = (heroReel ?? []).filter((item) =>
    item?._type === 'heroReelVideo' ? !!item.asset?.url : !!item?.photo?.image?.asset
  )
  const n = reel.length

  // `tick` is a monotonic virtual carousel position — it only ever counts up.
  // The reel item shown at virtual position `p` is `reel[p % n]`; an item's
  // on-screen offset is `p - tick`. Because `tick` never wraps, an item's
  // offset always changes by exactly ±1 per rotation, even when the reel
  // itself wraps from the last item back to the first — so nothing ever has
  // to "teleport" across the middle of the carousel to re-enter from the
  // other side.
  const [tick, setTick] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (n < 2) return
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTick((t) => t + 1)
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
      transitionTimeoutRef.current = setTimeout(() => setIsTransitioning(false), TRANSITION_MS)
    }, ROTATE_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
    }
  }, [n])

  if (n === 0) {
    // No hero reel configured in Sanity yet — fall back to the existing static Hero.
    return <Hero />
  }

  const active = ((tick % n) + n) % n
  const hasPeers = n > 1 // with exactly 2 items, prev and next both point at the same other item — expected

  // A small, constant-size render window around the active position — never
  // the whole reel — so media loading stays bounded regardless of how many
  // items are in heroReel. The two outermost offsets (-2/+2) are always
  // invisible; they exist only so an entering/exiting item can transition
  // smoothly instead of popping in/out at the edge of visibility.
  const windowOffsets = hasPeers ? [-2, -1, 0, 1, 2] : [0]

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
          The media side is a sliding carousel: the active item, previous/next
          peeking on either side, and (invisibly) the items just about to
          enter/exit — all positioned via a single virtual-position window so
          advancing genuinely animates a slide rather than crossfading two
          static positions. ── */}
      <div className="hidden md:block bg-sst-nav">
        <div className="max-w-[1280px] mx-auto px-8 lg:px-16 py-20 lg:py-24 flex items-center gap-12 lg:gap-20">
          <div className="flex-1 min-w-0">
            <HeroCopyDesktop />
          </div>

          <div className="flex flex-col items-center gap-5 shrink-0">
            <div className="relative overflow-hidden" style={{ width: STAGE_W, height: SLOT_H }}>
              {windowOffsets.map((offset) => {
                const pos = tick + offset
                const item = reel[((pos % n) + n) % n]
                return (
                  <SlidingSlot
                    key={pos}
                    item={item}
                    offset={offset}
                    showActiveMedia={offset === 0 && !isTransitioning}
                  />
                )
              })}
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
