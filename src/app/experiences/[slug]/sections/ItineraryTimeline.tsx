'use client'

import { useEffect, useRef, useState } from 'react'
import type { Trip } from '@/types'

function DayContent({
  day,
  alignRight,
}: {
  day: Trip['itinerary'][number]
  alignRight: boolean
}) {
  return (
    <div className={`relative ${alignRight ? 'text-right' : ''}`}>
      <div
        className="absolute font-display text-charcoal/6 select-none pointer-events-none leading-none"
        style={{
          fontSize: 'clamp(4rem, 8vw, 6rem)',
          top: '-1rem',
          [alignRight ? 'right' : 'left']: '-0.5rem',
        }}
        aria-hidden="true"
      >
        {String(day.day).padStart(2, '0')}
      </div>
      <p className="font-body text-xs uppercase tracking-widest text-sand mb-2">
        Day {day.day}
      </p>
      <h3 className="font-display text-xl text-charcoal leading-snug">{day.title}</h3>
      <p className="font-body text-sm text-charcoal/55 mt-2 leading-relaxed">
        {day.description}
      </p>
    </div>
  )
}

export function ItineraryTimeline({ trip }: { trip: Trip }) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState<boolean[]>(
    new Array(trip.itinerary.length).fill(false)
  )

  useEffect(() => {
    const observers = trip.itinerary.map((_, i) => {
      const el = itemRefs.current[i]
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev]
              next[i] = true
              return next
            })
            obs.disconnect()
          }
        },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="bg-offwhite py-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-body text-xs uppercase tracking-widest text-charcoal/40 mb-4">
            The Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal">Day by day.</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-charcoal/12 -translate-x-1/2" />
          {/* Mobile left line */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-charcoal/12" />

          {trip.itinerary.map((day, i) => {
            const isLeft = i % 2 === 0
            return (
              <div
                key={day.day}
                ref={(el) => { itemRefs.current[i] = el }}
                className={`
                  relative mb-14
                  transition-all duration-700 ease-out
                  ${visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
              >
                {/* Mobile layout */}
                <div className="md:hidden flex gap-6 pl-14">
                  <div className="absolute left-[15px] top-6 w-2.5 h-2.5 bg-sand rounded-full flex-shrink-0" />
                  <DayContent day={day} alignRight={false} />
                </div>

                {/* Desktop layout — alternating */}
                <div className="hidden md:flex items-start">
                  {/* Left half */}
                  <div className="w-1/2 pr-12">
                    {isLeft && <DayContent day={day} alignRight={true} />}
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 top-6 w-3 h-3 bg-sand rounded-full -translate-x-1/2 flex-shrink-0" />

                  {/* Right half */}
                  <div className="w-1/2 pl-12">
                    {!isLeft && <DayContent day={day} alignRight={false} />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
