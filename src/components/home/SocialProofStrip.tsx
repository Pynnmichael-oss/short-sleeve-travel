'use client'

import { useEffect, useRef } from 'react'
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

export function SocialProofStrip({ gallery }: { gallery?: HomeGallery | null }) {
  const hasSanityPhotos = gallery?.photos && gallery.photos.length > 0
  const caption = gallery?.caption ?? 'Real trips. Real people. Real memories.'

  const scrollRef = useRef<HTMLDivElement>(null)
  const idxRef = useRef(0)

  // Auto-advance only on mobile
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const isMobile = window.innerWidth < 768
    if (!isMobile) return

    const items = el.querySelectorAll<HTMLElement>('.sst-carousel-item')
    if (items.length < 2) return

    const interval = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % items.length
      items[idxRef.current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }, 3000)

    return () => clearInterval(interval)
  }, [hasSanityPhotos])

  const renderPhoto = (src: string, alt: string, key: string) => (
    <div
      key={key}
      className="sst-carousel-item relative flex-shrink-0 w-[80vw] md:w-auto aspect-square overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 80vw, 25vw"
      />
    </div>
  )

  const renderSanityPhoto = (photo: GalleryPhoto, i: number) => {
    if (!photo?.asset) return null
    const src = urlFor(photo).width(800).height(800).url()
    const alt = photo.alt ?? `Trip photo ${i + 1}`
    return renderPhoto(src, alt, `sanity-${i}`)
  }

  return (
    <section className="bg-sst-white py-12 md:py-16 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-6 md:px-0 md:grid md:grid-cols-4 md:max-w-7xl md:mx-auto md:gap-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {hasSanityPhotos
          ? gallery!.photos!.map((p, i) => renderSanityPhoto(p, i))
          : FALLBACK_PHOTOS.map(({ src, alt }) => renderPhoto(src, alt, src))}
      </div>
      <p className="text-center font-body text-sm text-sst-navy/40 mt-6 tracking-wide">
        {caption}
      </p>
    </section>
  )
}
