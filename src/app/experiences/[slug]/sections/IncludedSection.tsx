'use client'

import { useEffect, useRef, useState } from 'react'
import type { Trip } from '@/types'

export function IncludedSection({ trip }: { trip: Trip }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
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
    <section ref={ref} className="bg-forest py-24">
      <div
        className={`
          max-w-4xl mx-auto px-6
          transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Included */}
          <div>
            <h3 className="font-display text-2xl text-offwhite mb-8">
              {"What's included"}
            </h3>
            <ul className="space-y-4">
              {trip.included.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-offwhite/70">
                  <span className="text-sand mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Not included */}
          <div>
            <h3 className="font-display text-2xl text-offwhite mb-8">Not included</h3>
            <ul className="space-y-4">
              {trip.notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-offwhite/40">
                  <span className="mt-0.5 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
