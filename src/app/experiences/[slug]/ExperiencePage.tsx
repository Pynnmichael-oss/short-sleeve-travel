'use client'

import type { Trip } from '@/types'
import { HeroSection } from './sections/HeroSection'
import { StatsBar } from './sections/StatsBar'
import { StickyHook } from './sections/StickyHook'
import { IncludedSection } from './sections/IncludedSection'
import { DepartureDates } from './sections/DepartureDates'
import { BookingCTA } from './sections/BookingCTA'

export function ExperiencePage({ trip }: { trip: Trip }) {
  return (
    <>
      <HeroSection trip={trip} />
      <StatsBar trip={trip} />
      <StickyHook trip={trip} />
      <IncludedSection trip={trip} />
      <DepartureDates trip={trip} />
      <BookingCTA trip={trip} />
    </>
  )
}
