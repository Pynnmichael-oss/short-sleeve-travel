'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CardData {
  label: string
  title: string
  destination: string
  description: string
  highlights: string[]
  link: string
  quote: string
  quoteAuthor: string
  image: string
  imageAlt: string
  imageRight: boolean
  contentForest: boolean
}

const CARDS: CardData[] = [
  {
    label: 'COMPLETED · 13 DAYS · 12 TRAVELERS',
    title: 'New Zealand Adventure',
    destination: 'New Zealand',
    description:
      'Twelve people who had never met crossed two islands in thirteen days. Glowworm caves, Hobbiton, Milford Sound, and a sunrise over Lake Wanaka. Some of them are already planning the next one.',
    highlights: ['Waitomo Caves', 'Hobbiton', 'Milford Sound'],
    link: '/experiences/new-zealand-adventure',
    quote:
      'Day one, glowworm caves. Day two, Hobbiton. By day three I had already texted everyone I know to book it.',
    quoteAuthor: 'Sophie K.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200',
    imageAlt: 'New Zealand landscape',
    imageRight: false,
    contentForest: true,
  },
  {
    label: 'COMPLETED · 7 DAYS · 12 TRAVELERS',
    title: 'Spirit of Japan',
    destination: 'Japan',
    description:
      'Twelve travelers, three cities, seven days. Tokyo at night, Mount Fuji at dawn, the bamboo forest at golden hour. Japan got all of them.',
    highlights: ['Senso-Ji Temple', 'Bamboo Forest', 'Mount Fuji'],
    link: '/experiences/spirit-of-japan',
    quote:
      'Seven days is not enough. I went back on my own two months later. That is what Japan does.',
    quoteAuthor: 'Liam T.',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200',
    imageAlt: 'Japan street scene',
    imageRight: true,
    contentForest: false,
  },
  {
    label: 'COMPLETED · 9 DAYS · 12 TRAVELERS',
    title: 'Morocco Uncovered',
    destination: 'Morocco',
    description:
      'Twelve people drove from Marrakech to the Sahara and back. Souks, desert glamping, Ait Ben Haddou, tagine made from scratch. Morocco does not let anyone leave unchanged.',
    highlights: ['Sahara Desert', 'Jardin Majorelle', 'Ait Ben Haddou'],
    link: '/experiences/morocco-uncovered',
    quote:
      'The Sahara night changed something. I cannot explain it properly. You just have to go.',
    quoteAuthor: 'Priya M.',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200',
    imageAlt: 'Morocco medina and desert landscape',
    imageRight: false,
    contentForest: true,
  },
]

function TripCard({ card, index }: { card: CardData; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const imageEl = (
    <div className="relative md:w-[45%] w-full h-72 md:h-auto overflow-hidden flex-shrink-0">
      <Image
        src={card.image}
        alt={card.imageAlt}
        fill
        className="object-cover transition-transform duration-700 hover:scale-105"
        sizes="(max-width: 768px) 100vw, 45vw"
      />
    </div>
  )

  const contentEl = (
    <div
      className={`md:flex-1 flex flex-col justify-center px-10 py-12 md:py-16 ${
        card.contentForest ? 'bg-sst-nav' : 'bg-sst-white'
      }`}
    >
      <p
        className={`font-body text-xs tracking-widest mb-5 ${
          card.contentForest ? 'text-sst-sand/70' : 'text-sst-navy/50'
        }`}
      >
        {card.label}
      </p>

      <h3
        className={`font-display text-3xl md:text-4xl leading-tight mb-2 ${
          card.contentForest ? 'text-sst-white' : 'text-sst-navy'
        }`}
      >
        {card.title}
      </h3>

      <p
        className={`font-body text-sm mb-6 ${
          card.contentForest ? 'text-sst-sand' : 'text-sst-navy/60'
        }`}
      >
        {card.destination}
      </p>

      <p
        className={`font-body text-base leading-relaxed mb-8 max-w-md ${
          card.contentForest ? 'text-sst-white/80' : 'text-sst-navy/80'
        }`}
      >
        {card.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {card.highlights.map((h) => (
          <span
            key={h}
            className={`font-body text-xs px-3 py-1 border ${
              card.contentForest
                ? 'border-sst-sand/40 text-sst-sand'
                : 'border-sst-sand text-sst-navy/70'
            }`}
          >
            {h}
          </span>
        ))}
      </div>

      <blockquote
        className={`font-display italic text-base leading-relaxed border-l-2 pl-4 mb-8 max-w-sm ${
          card.contentForest
            ? 'border-sst-sand text-sst-white/70'
            : 'border-sst-amber text-sst-navy/70'
        }`}
      >
        &ldquo;{card.quote}&rdquo;
        <footer
          className={`font-body not-italic text-xs mt-2 ${
            card.contentForest ? 'text-sst-sand/60' : 'text-sst-navy/50'
          }`}
        >
          — {card.quoteAuthor}
        </footer>
      </blockquote>

      <Link
        href={card.link}
        className="font-body text-sm text-sst-amber hover:text-sst-amber/80 transition-colors duration-200 tracking-wide uppercase"
      >
        Read About This Trip &rarr;
      </Link>
    </div>
  )

  return (
    <article
      ref={ref}
      className={`flex flex-col transition-all duration-700 ${
        card.imageRight ? 'md:flex-row-reverse' : 'md:flex-row'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {imageEl}
      {contentEl}
    </article>
  )
}

export function DestTripCards() {
  return (
    <section className="bg-sst-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8 text-center">
        <p className="font-body text-xs tracking-widest uppercase text-sst-navy/50 mb-4">
          The Trips
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-sst-navy">
          Every one of these changed someone.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto mt-12 flex flex-col gap-0">
        {CARDS.map((card, i) => (
          <TripCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </section>
  )
}
