import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

const leftImages = [
  {
    src: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600',
    alt: 'Group hiking together',
    height: 'h-80',
  },
  {
    src: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?w=600',
    alt: 'Travelers at a viewpoint',
    height: 'h-52',
  },
  {
    src: 'https://images.unsplash.com/photo-1475688621402-4257c812d6db?w=600',
    alt: 'Friends on a trail',
    height: 'h-64',
  },
]

const rightImages = [
  {
    src: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600',
    alt: 'Traveler exploring a local market',
    height: 'h-52',
  },
  {
    src: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600',
    alt: 'Group at sunset',
    height: 'h-72',
  },
  {
    src: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600',
    alt: 'Solo traveler on the road',
    height: 'h-60',
  },
]

export function CommunityGrid() {
  return (
    <section className="bg-sst-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4 mb-14">
          <SectionLabel className="text-sst-sand">Our People</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-sst-navy">
            The faces behind the adventures.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Left column */}
          <div className="flex flex-col gap-3">
            {leftImages.map(({ src, alt, height }) => (
              <div key={src} className={`relative ${height} overflow-hidden`}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Right column — offset for mosaic feel */}
          <div className="flex flex-col gap-3 mt-8">
            {rightImages.map(({ src, alt, height }) => (
              <div key={src} className={`relative ${height} overflow-hidden`}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
