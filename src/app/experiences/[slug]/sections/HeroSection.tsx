'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Trip } from '@/types'

export function HeroSection({ trip }: { trip: Trip }) {
  const imageWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (imageWrapperRef.current) {
        imageWrapperRef.current.style.transform = `translateY(${window.scrollY * 0.5}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax image */}
      <div
        ref={imageWrapperRef}
        style={{ position: 'absolute', top: '-18%', left: 0, right: 0, bottom: '-18%' }}
      >
        <Image
          src={trip.heroImage}
          alt={`${trip.destination}, ${trip.country}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="font-body text-sand/80 text-xs uppercase tracking-[0.35em] mb-6">
          {trip.destination}, {trip.country}
        </p>

        <h1
          className="font-display text-offwhite leading-none"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}
        >
          {trip.tagline}
        </h1>

        <div className="flex items-center gap-4 mt-8 font-body text-offwhite/50 text-sm">
          <span>{trip.duration} days</span>
          <span className="text-offwhite/20">·</span>
          <span>Group of {trip.groupSize}</span>
          <span className="text-offwhite/20">·</span>
          <span className="text-sand">From ${trip.price.toLocaleString()}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-offwhite/40">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
