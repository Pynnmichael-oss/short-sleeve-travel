'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Trip } from '@/types'
import { urlFor } from '@/lib/sanity'

const NZ_VIDEO_SRC = '/short-sleeve-travel/videos/new-zealand-hero.mp4'

const FALLBACK_IMAGES: Record<string, string> = {
  'new-zealand-adventure': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920',
  'spirit-of-japan': 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920',
  'morocco-uncovered': 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1920',
}

export function HeroSection({ trip }: { trip: Trip }) {
  const mediaWrapperRef = useRef<HTMLDivElement>(null)
  const isVideo = trip.slug.current === 'new-zealand-adventure'

  const heroSrc = trip.heroImage?.asset
    ? urlFor(trip.heroImage).width(1920).url()
    : (FALLBACK_IMAGES[trip.slug.current] ?? '/short-sleeve-travel/images/placeholder.jpg')

  useEffect(() => {
    const onScroll = () => {
      if (mediaWrapperRef.current) {
        mediaWrapperRef.current.style.transform = `translateY(${window.scrollY * 0.5}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax media */}
      <div
        ref={mediaWrapperRef}
        style={{ position: 'absolute', top: '-18%', left: 0, right: 0, bottom: '-18%' }}
      >
        {isVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroSrc}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={NZ_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : heroSrc ? (
          <Image
            src={heroSrc}
            alt={trip.destination}
            fill
            className="object-cover"
            priority
          />
        ) : null}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="font-body text-sst-sand/80 text-xs uppercase tracking-[0.35em] mb-6">
          {trip.destination}
        </p>

        <h1
          className="font-display text-sst-white leading-none"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}
        >
          {trip.tagline}
        </h1>

        <div className="flex items-center gap-4 mt-8 font-body text-sst-white/50 text-sm">
          <span>{trip.durationDays} days</span>
          <span className="text-sst-white/20">·</span>
          <span>{trip.region}</span>
          <span className="text-sst-white/20">·</span>
          <span className="text-sst-sand">From ${trip.priceFrom.toLocaleString()}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-sst-white/40">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
