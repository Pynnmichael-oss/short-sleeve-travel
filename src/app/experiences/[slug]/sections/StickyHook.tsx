'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Trip } from '@/types'

export function StickyHook({ trip }: { trip: Trip }) {
  const images = trip.galleryImages.slice(0, 3)
  const imgRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visibleImages, setVisibleImages] = useState<boolean[]>(
    new Array(images.length).fill(false)
  )

  useEffect(() => {
    const observers = images.map((_, i) => {
      const el = imgRefs.current[i]
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleImages((prev) => {
              const next = [...prev]
              next[i] = true
              return next
            })
            obs.disconnect()
          }
        },
        { threshold: 0.25 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="bg-sst-surface overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Sticky left panel */}
        <div className="md:w-2/5 flex-shrink-0">
          <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center px-8 md:px-14 py-20 md:py-0">
            <p className="font-body text-xs uppercase tracking-widest text-sst-navy/40 mb-8">
              The Experience
            </p>
            <span
              className="font-display text-sst-sand/30 leading-none select-none"
              style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}
              aria-hidden="true"
            >
              &#8220;
            </span>
            <p
              className="font-display text-sst-navy -mt-4 leading-snug"
              style={{ fontSize: 'clamp(1.15rem, 2vw, 1.4rem)' }}
            >
              {trip.hook}
            </p>
          </div>
        </div>

        {/* Scrolling images */}
        <div className="md:w-3/5">
          {images.map((src, i) => (
            <div
              key={i}
              ref={(el) => { imgRefs.current[i] = el }}
              className="relative overflow-hidden"
              style={{ height: 'clamp(300px, 60vw, 100vh)' }}
            >
              <Image
                src={src}
                alt={`${trip.destination} gallery ${i + 1}`}
                fill
                className="object-cover"
                style={{
                  opacity: visibleImages[i] ? 1 : 0,
                  transition: 'opacity 1s ease-in',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
