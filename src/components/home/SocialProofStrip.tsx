'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface GalleryPhoto {
  asset: any
  caption?: string
  alt?: string
}

interface HomeGallery {
  photos?: GalleryPhoto[]
  caption?: string
}

const FALLBACK_PHOTOS = [
  { src: '/short-sleeve-travel/images/tent-selfie.jpg', alt: 'Friends taking a selfie at camp' },
  { src: '/short-sleeve-travel/images/slip-slide.jpg', alt: 'Group on a water slide' },
  { src: '/short-sleeve-travel/images/friends-hug.jpg', alt: 'Travellers hugging at a destination' },
  { src: '/short-sleeve-travel/images/vineyard-girls.jpg', alt: 'Girls at a vineyard' },
]

function resolvePhotos(gallery?: HomeGallery | null): { src: string; alt: string }[] {
  if (gallery?.photos?.length) {
    return gallery.photos
      .filter((p) => p?.asset)
      .map((p, i) => ({
        src: urlFor(p).width(800).height(800).url(),
        alt: p.alt ?? `Trip photo ${i + 1}`,
      }))
  }
  return FALLBACK_PHOTOS
}

export function SocialProofStrip({ gallery }: { gallery?: HomeGallery | null }) {
  const photos = resolvePhotos(gallery)
  const caption = gallery?.caption ?? 'Real trips. Real people. Real memories.'

  const [active, setActive] = useState(0)

  useEffect(() => {
    if (photos.length < 2) return
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % photos.length)
    }, 3500)
    return () => clearInterval(id)
  }, [photos.length])

  return (
    <section className="bg-sst-white py-12 md:py-16">

      {/* ── Mobile: fade carousel ─────────────────────────────── */}
      <div className="relative md:hidden mx-6 aspect-square overflow-hidden">
        {photos.map(({ src, alt }, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-all duration-700"
            style={{
              opacity: i === active ? 1 : 0,
              transform: i === active ? 'translateY(0)' : 'translateY(12px)',
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
      </div>

      {/* Dot indicators (mobile only) */}
      <div className="flex md:hidden justify-center gap-2 mt-4">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to photo ${i + 1}`}
            className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            style={{ background: i === active ? '#E8A020' : '#2E4A5A33' }}
          />
        ))}
      </div>

      {/* ── Desktop: static 4-col grid ───────────────────────── */}
      <div className="hidden md:grid md:grid-cols-4 md:max-w-7xl md:mx-auto md:gap-4 md:px-0">
        {photos.map(({ src, alt }) => (
          <div key={src} className="relative aspect-square overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
        ))}
      </div>

      <p className="text-center font-body text-sm text-sst-navy/40 mt-6 tracking-wide">
        {caption}
      </p>
    </section>
  )
}
