'use client'

import { useEffect, useRef, useState } from 'react'
import type { Trip } from '@/types'

export function StatsBar({ trip }: { trip: Trip }) {
  const ref = useRef<HTMLDivElement>(null)
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
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const stats = [
    { value: `${trip.durationDays}`, unit: 'Days' },
    { value: trip.region, unit: 'Region' },
    { value: `$${trip.priceFrom.toLocaleString()}`, unit: 'Starting from' },
    { value: `$${trip.deposit.toLocaleString()}`, unit: 'Deposit' },
  ]

  return (
    <div ref={ref} className="bg-sst-nav py-14">
      <div
        className={`
          max-w-5xl mx-auto px-6
          grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-sst-white/10
          transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        {stats.map((stat) => (
          <div key={stat.unit} className="flex flex-col items-center text-center md:px-8">
            <span
              className="font-display text-sst-sand leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {stat.value}
            </span>
            <span className="font-body text-sst-white/50 text-xs uppercase tracking-widest mt-2">
              {stat.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
