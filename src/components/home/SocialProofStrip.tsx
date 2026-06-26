import Image from 'next/image'

const PHOTOS = [
  { src: '/short-sleeve-travel/images/tent-selfie.jpg', alt: 'Friends taking a selfie at camp' },
  { src: '/short-sleeve-travel/images/slip-slide.jpg', alt: 'Group on a water slide' },
  { src: '/short-sleeve-travel/images/friends-hug.jpg', alt: 'Travellers hugging at a destination' },
  { src: '/short-sleeve-travel/images/vineyard-girls.jpg', alt: 'Girls at a vineyard' },
]

export function SocialProofStrip() {
  return (
    <section className="bg-sst-white py-12 md:py-16 overflow-hidden">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-6 md:px-0 md:grid md:grid-cols-4 md:max-w-7xl md:mx-auto md:gap-4">
        {PHOTOS.map(({ src, alt }) => (
          <div
            key={src}
            className="relative flex-shrink-0 w-[72vw] md:w-auto aspect-square overflow-hidden"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 72vw, 25vw"
            />
          </div>
        ))}
      </div>
      <p className="text-center font-body text-sm text-sst-navy/40 mt-6 tracking-wide">
        Real trips. Real people. Real memories.
      </p>
    </section>
  )
}
