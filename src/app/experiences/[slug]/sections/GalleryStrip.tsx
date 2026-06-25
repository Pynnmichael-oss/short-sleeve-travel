'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Trip } from '@/types'

export function GalleryStrip({ trip }: { trip: Trip }) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateButtons = () => {
    const el = galleryRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    const el = galleryRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > 0) return
      e.preventDefault()
      el.scrollLeft += e.deltaY * 1.5
      updateButtons()
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('scroll', updateButtons)
    updateButtons()

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('scroll', updateButtons)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollBy = (amount: number) => {
    galleryRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="bg-sst-navy py-16">
      {/* Header row */}
      <div className="px-8 md:px-12 mb-8 flex items-end justify-between">
        <p className="font-body text-xs uppercase tracking-widest text-sst-sand/70">
          The Experience
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-window.innerWidth * 0.65)}
            disabled={!canScrollLeft}
            aria-label="Scroll gallery left"
            className="w-10 h-10 flex items-center justify-center border border-sst-white/20 text-sst-white/60 hover:text-sst-white hover:border-sst-white/40 transition-colors duration-200 disabled:opacity-20 disabled:cursor-default"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => scrollBy(window.innerWidth * 0.65)}
            disabled={!canScrollRight}
            aria-label="Scroll gallery right"
            className="w-10 h-10 flex items-center justify-center border border-sst-white/20 text-sst-white/60 hover:text-sst-white hover:border-sst-white/40 transition-colors duration-200 disabled:opacity-20 disabled:cursor-default"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable strip */}
      <div
        ref={galleryRef}
        className="flex overflow-x-auto gap-3 px-8 md:px-12 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
      >
        {trip.galleryImages.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 overflow-hidden"
            style={{ width: '70vw', height: '500px' }}
          >
            <Image
              src={src}
              alt={`${trip.destination} — image ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
