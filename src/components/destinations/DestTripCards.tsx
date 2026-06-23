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
    label: 'COMPLETED · 12 DAYS · 10 TRAVELERS',
    title: 'Edge of the World',
    destination: 'Patagonia, Chile',
    description:
      'Ten strangers flew to the end of the earth and came back as something closer to family. Torres del Paine does that to people.',
    highlights: ['Torres del Paine', 'Glacier Grey', 'Wild Camping'],
    link: '/experiences/patagonia-chile',
    quote:
      'I have done a lot of trips. This was the one that made me stop comparing everything else to it.',
    quoteAuthor: 'Marcus T.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200',
    imageAlt: 'Patagonia landscape with towers',
    imageRight: false,
    contentForest: true,
  },
  {
    label: 'COMPLETED · 8 DAYS · 12 TRAVELERS',
    title: 'Culture, Mezcal & Mountains',
    destination: 'Oaxaca, Mexico',
    description:
      'Twelve people who had never met shared a cooking class, a mezcal tasting, and a sunrise over Monte Alban. Some of them are planning the next trip together already.',
    highlights: ['Sierra Norte', 'Mezcal Trail', 'Monte Alban'],
    link: '/experiences/oaxaca-mexico',
    quote:
      'Oaxaca felt like being let in on a secret. I have told everyone I know to go.',
    quoteAuthor: 'Priya S.',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1200',
    imageAlt: 'Oaxaca colorful streets',
    imageRight: true,
    contentForest: false,
  },
  {
    label: 'COMPLETED · 10 DAYS · 8 TRAVELERS',
    title: 'Atlantic Wild',
    destination: 'The Azores, Portugal',
    description:
      'Eight people, nine islands, one Atlantic ocean. The Azores is the kind of place that makes you question why you ever went anywhere else.',
    highlights: ['Sete Cidades', 'Whale Watching', 'Furnas Springs'],
    link: '/experiences/azores-portugal',
    quote:
      'The whale watching alone was worth the flight. Everything after that was just extraordinary.',
    quoteAuthor: 'James R.',
    image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1200',
    imageAlt: 'Azores volcanic island landscape',
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
        card.contentForest ? 'bg-forest' : 'bg-offwhite'
      }`}
    >
      <p
        className={`font-body text-xs tracking-widest mb-5 ${
          card.contentForest ? 'text-sand/70' : 'text-charcoal/50'
        }`}
      >
        {card.label}
      </p>

      <h3
        className={`font-display text-3xl md:text-4xl leading-tight mb-2 ${
          card.contentForest ? 'text-warmwhite' : 'text-charcoal'
        }`}
      >
        {card.title}
      </h3>

      <p
        className={`font-body text-sm mb-6 ${
          card.contentForest ? 'text-sand' : 'text-charcoal/60'
        }`}
      >
        {card.destination}
      </p>

      <p
        className={`font-body text-base leading-relaxed mb-8 max-w-md ${
          card.contentForest ? 'text-offwhite/80' : 'text-charcoal/80'
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
                ? 'border-sand/40 text-sand'
                : 'border-sand text-charcoal/70'
            }`}
          >
            {h}
          </span>
        ))}
      </div>

      <blockquote
        className={`font-display italic text-base leading-relaxed border-l-2 pl-4 mb-8 max-w-sm ${
          card.contentForest
            ? 'border-sand text-offwhite/70'
            : 'border-burnt text-charcoal/70'
        }`}
      >
        &ldquo;{card.quote}&rdquo;
        <footer
          className={`font-body not-italic text-xs mt-2 ${
            card.contentForest ? 'text-sand/60' : 'text-charcoal/50'
          }`}
        >
          — {card.quoteAuthor}
        </footer>
      </blockquote>

      <Link
        href={card.link}
        className="font-body text-sm text-burnt hover:text-burnt/80 transition-colors duration-200 tracking-wide uppercase"
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
    <section className="bg-offwhite">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8 text-center">
        <p className="font-body text-xs tracking-widest uppercase text-charcoal/50 mb-4">
          The Trips
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-charcoal">
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
