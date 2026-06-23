'use client'

import dynamic from 'next/dynamic'

const GlobeMap = dynamic(
  () => import('./GlobeMap').then((m) => m.GlobeMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] md:h-[600px] w-full bg-[#1a1a1a]" />
    ),
  }
)

export function GlobeMapWrapper() {
  return <GlobeMap />
}
