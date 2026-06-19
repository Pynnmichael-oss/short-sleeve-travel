'use client'

import type { Trip } from '@/types'
import { HeroSection } from './sections/HeroSection'
import { StatsBar } from './sections/StatsBar'
import { StickyHook } from './sections/StickyHook'
import { ItineraryTimeline } from './sections/ItineraryTimeline'
import { IncludedSection } from './sections/IncludedSection'
import { WhoItsFor } from './sections/WhoItsFor'
import { GalleryStrip } from './sections/GalleryStrip'
import { BookingCTA } from './sections/BookingCTA'

export function ExperiencePage({ trip }: { trip: Trip }) {
  return (
    <>
      <HeroSection trip={trip} />
      <StatsBar trip={trip} />
      <StickyHook trip={trip} />
      <ItineraryTimeline trip={trip} />
      <IncludedSection trip={trip} />
      <WhoItsFor trip={trip} />
      <GalleryStrip trip={trip} />
      <BookingCTA trip={trip} />
    </>
  )
}
