'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { number: '3', label: 'Destinations' },
  { number: '3', label: 'Continents' },
  { number: '33', label: 'Travelers' },
  { number: '100%', label: 'Would Return' },
]

export function DestStatsBar() {
  const ref = useRef<HTMLDivElement>(null)
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
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-forest py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <p className="font-display text-5xl md:text-6xl text-sand leading-none mb-3">
              {stat.number}
            </p>
            <p className="font-body text-xs tracking-widest uppercase text-offwhite/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
