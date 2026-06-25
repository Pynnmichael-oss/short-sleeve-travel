'use client'

import { useEffect, useRef, useState } from 'react'
import type { Trip } from '@/types'

export function WhoItsFor({ trip }: { trip: Trip }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="bg-sst-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs uppercase tracking-widest text-sst-navy/40 mb-4">
            Is this trip for you?
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-sst-navy">
            Three types of traveler love this trip.
          </h2>
        </div>

        <div
          ref={containerRef}
          className="grid md:grid-cols-3 gap-8"
        >
          {trip.whoItsFor.map((persona, i) => (
            <div
              key={persona.type}
              className={`
                bg-white p-8 border-t-2 border-sst-sand
                transition-all duration-700 ease-out
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <h3 className="font-display text-2xl text-sst-navy mb-4">{persona.type}</h3>
              <p className="font-body text-sm text-sst-navy/60 leading-relaxed">
                {persona.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
