'use client'

import { useEffect, useRef, useState } from 'react'
import type { Trip } from '@/types'

const NOT_INCLUDED = [
  'International flights',
  'Travel insurance',
  'Personal spending',
]

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

  const inc = trip.inclusions ?? {}
  const included: string[] = [
    ...(inc.accommodation ? [inc.accommodation] : []),
    ...(inc.transport ?? []),
    ...(inc.meals ?? []),
    ...(inc.activities ?? []),
  ]

  return (
    <section ref={ref} className="bg-sst-nav py-24">
      <div
        className={`
          max-w-4xl mx-auto px-6
          transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h3 className="font-display text-2xl text-sst-white mb-8">{"What's included"}</h3>
            <ul className="space-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-sst-white/70">
                  <span className="text-sst-sand mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-2xl text-sst-white mb-8">Not included</h3>
            <ul className="space-y-4">
              {NOT_INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-sst-white/40">
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
