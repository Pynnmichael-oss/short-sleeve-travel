'use client'

import dynamic from 'next/dynamic'
import type { GlobeTrip } from './GlobeMap'

const GlobeMap = dynamic(
  () => import('./GlobeMap').then((m) => m.GlobeMap),
  {
    ssr: false,
    // Transparent — the sized wrapper below carries the placeholder background,
    // since it (unlike this loading component) knows the variant.
    loading: () => <div className="h-full w-full" />,
  }
)

export function GlobeMapWrapper({
  trips,
  variant = 'full',
}: {
  trips: GlobeTrip[]
  variant?: 'full' | 'teaser'
}) {
  const isTeaser = variant === 'teaser'

  return (
    <div
      className={
        isTeaser
          ? 'h-full w-full bg-sst-surface'
          : 'h-[400px] md:h-[600px] w-full bg-[#1a1a1a]'
      }
    >
      <GlobeMap trips={trips} variant={variant} />
    </div>
  )
}
