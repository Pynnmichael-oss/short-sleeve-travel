import { FounderHero } from '@/components/about/FounderHero'
import { KatsStory } from '@/components/about/KatsStory'
import { Values } from '@/components/about/Values'
import { ByTheNumbers } from '@/components/about/ByTheNumbers'
import { CommunityGrid } from '@/components/about/CommunityGrid'
import { AboutCTA } from '@/components/about/AboutCTA'

export const metadata = {
  title: 'About — Short Sleeve Travel',
  description:
    'Meet Kat Shortsleeve and learn why Short Sleeve Travel exists — small groups, big adventures, real connection.',
}

export default function AboutPage() {
  return (
    <>
      <FounderHero />
      <KatsStory />
      <Values />
      <ByTheNumbers />
      <CommunityGrid />
      <AboutCTA />
    </>
  )
}
