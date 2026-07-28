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
}

type HeroReelItem = HeroReelImageItem | HeroReelVideoItem

// Rotation stays on a fixed interval for both images and videos rather than
// waiting for a video clip to finish a loop — simpler to reason about, and
// keeps pacing consistent regardless of clip length. Revisit if clips need
// to guarantee at least one full playthrough.
const ROTATE_MS = 4000

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

// Renders one reel slot, branching on the Sanity `_type` discriminant.
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
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />
    </div>
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

      {/* ── Desktop/tablet: two-column split. Right column's 9:16 aspect
          ratio sets the row height; the left column stretches to match. ── */}
      <div className="hidden md:grid md:grid-cols-2">
        <div className="flex items-center bg-sst-nav px-12 lg:px-20 py-16">
          <HeroCopy align="left" />
        </div>
        <div className="relative w-full aspect-[9/16]">
          {reel.map((item, i) => (
            <ReelSlot key={i} item={item} active={i === active} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
