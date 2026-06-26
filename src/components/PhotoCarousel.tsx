'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Photo {
  src: string
  alt: string
}

export function PhotoCarousel({ photos, caption }: { photos: Photo[]; caption: string }) {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function startInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % photos.length)
    }, 3500)
  }

  useEffect(() => {
    if (photos.length < 2) return
    startInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [photos.length])

  function prev() {
    setActive((a) => (a - 1 + photos.length) % photos.length)
    startInterval()
  }

  function next() {
    setActive((a) => (a + 1) % photos.length)
    startInterval()
  }

  if (!photos.length) return null

  return (
    <section className="bg-sst-white py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-6">

        {/* Photo stage */}
        <div className="relative aspect-square w-full overflow-hidden">
          {photos.map(({ src, alt }, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-all duration-600"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? 'translateX(0)' : 'translateX(24px)',
                pointerEvents: i === active ? 'auto' : 'none',
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) calc(100vw - 3rem), 768px"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Arrow buttons */}
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); startInterval() }}
              aria-label={`Go to photo ${i + 1}`}
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{ background: i === active ? '#E8A020' : '#2E4A5A33' }}
            />
          ))}
        </div>

        {/* Caption */}
        <p className="text-center font-body text-sm text-sst-navy/40 mt-5 tracking-wide">
          {caption}
        </p>
      </div>
    </section>
  )
}
