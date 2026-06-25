import Image from 'next/image'
import type { Trip, GalleryImage } from '@/types'
import { urlFor } from '@/lib/sanity'

export function PhotoGallery({ trip }: { trip: Trip }) {
  const images: GalleryImage[] = trip.gallery ?? []
  if (images.length === 0) return null

  return (
    <section className="bg-sst-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-body text-xs uppercase tracking-widest text-sst-navy/40 mb-8 text-center">
          Photos
        </p>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => {
            const src = urlFor(img).width(900).url()
            const alt = img.alt ?? `${trip.destination} photo ${i + 1}`
            return (
              <figure key={img._key ?? i} className="break-inside-avoid">
                <div className="relative overflow-hidden">
                  <Image
                    src={src}
                    alt={alt}
                    width={900}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {img.caption && (
                  <figcaption className="font-body text-xs text-sst-navy/40 mt-2 px-1">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
