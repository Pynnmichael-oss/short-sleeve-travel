'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Photo {
  src: string
  alt: string
}

// Normalised distance from active index: -1 = left, 0 = centre, +1 = right
function slot(i: number, active: number, n: number): number {
  let d = i - active
  if (d > n / 2)  d -= n
  if (d < -n / 2) d += n
  return d
}

// Per-slot visual style for the desktop 3-up view
function slotStyle(d: number): React.CSSProperties {
  if (d === 0)  return { transform: 'translateX(0) scale(1)',      opacity: 1,    zIndex: 2 }
  if (d === -1) return { transform: 'translateX(-72%) scale(0.92)', opacity: 0.7,  zIndex: 1 }
  if (d === 1)  return { transform: 'translateX(72%) scale(0.92)',  opacity: 0.7,  zIndex: 1 }
  // off-screen — placed beyond the peeking side so it slides in/out smoothly
  return { transform: `translateX(${d < 0 ? '-200%' : '200%'}) scale(0.92)`, opacity: 0, zIndex: 0 }
}

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export function PhotoCarousel({ photos, caption }: { photos: Photo[]; caption: string }) {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const n = photos.length

  function startInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (n < 2) return
    intervalRef.current = setInterval(() => setActive((p) => (p + 1) % n), 3500)
  }

  useEffect(() => {
    startInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [n]) // eslint-disable-line react-hooks/exhaustive-deps

  function go(dir: 1 | -1) {
    setActive((a) => (a + dir + n) % n)
    startInterval()
  }

  if (!n) return null

  const arrowClass =
    'absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors duration-200'

  return (
    <section className="bg-sst-white py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-6">

        {/* ── Desktop: 3-photo depth carousel ─────────────────── */}
        <div className="hidden md:block">
          {/* overflow-hidden clips the peeking side photos */}
          <div className="relative aspect-square overflow-hidden">
            {photos.map(({ src, alt }, i) => {
              const d = slot(i, active, n)
              return (
                <div
                  key={src}
                  className="absolute inset-0 transition-all duration-500 ease-in-out"
                  style={slotStyle(d)}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 50vw, 600px"
                    priority={i === 0}
                  />
                </div>
              )
            })}
            <button onClick={() => go(-1)} aria-label="Previous photo" className={`${arrowClass} left-3`}><ChevronLeft /></button>
            <button onClick={() => go(1)}  aria-label="Next photo"     className={`${arrowClass} right-3`}><ChevronRight /></button>
          </div>
        </div>

        {/* ── Mobile: 1-photo fade carousel ───────────────────── */}
        <div className="md:hidden relative aspect-square overflow-hidden">
          {photos.map(({ src, alt }, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-all duration-700 ease-in-out"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? 'translateX(0)' : 'translateX(20px)',
                pointerEvents: i === active ? 'auto' : 'none',
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="calc(100vw - 3rem)"
                priority={i === 0}
              />
            </div>
          ))}
          <button onClick={() => go(-1)} aria-label="Previous photo" className={`${arrowClass} left-3`}><ChevronLeft /></button>
          <button onClick={() => go(1)}  aria-label="Next photo"     className={`${arrowClass} right-3`}><ChevronRight /></button>
        </div>

        {/* ── Dot indicators ───────────────────────────────────── */}
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

        <p className="text-center font-body text-sm text-sst-navy/40 mt-5 tracking-wide">
          {caption}
        </p>
      </div>
    </section>
  )
}
