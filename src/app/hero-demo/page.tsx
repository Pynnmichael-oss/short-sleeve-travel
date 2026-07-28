import { InstagramFeed } from '@/components/InstagramFeed'
import { HeroSplit } from '@/components/HeroSplit'
import { UpcomingTrips } from '@/components/home/UpcomingTrips'
import { HowItWorks } from '@/components/home/HowItWorks'
import { CommunityCloser } from '@/components/home/CommunityCloser'
import { FooterCTA } from '@/components/home/FooterCTA'
import { getUpcomingTrips, getHeroReel } from '@/lib/queries'

// Disposable comparison route for a new split-hero design. Duplicates the
// homepage's data fetching and section stack, swapping in HeroSplit for
// Hero — see CLAUDE.md "Do Not" and homepage files, none of which are
// touched by this route.
export default async function HeroDemo() {
  const [upcomingTrips, gallery] = await Promise.all([
    getUpcomingTrips(),
    getHeroReel(),
  ])

  const heroReel = (gallery?.heroReel ?? []).filter((item: any) =>
    item?._type === 'heroReelVideo' ? !!item.asset?.url : !!item?.photo?.image?.asset
  )

  return (
    <>
      <HeroSplit heroReel={heroReel} />
      <UpcomingTrips trips={upcomingTrips} />
      <HowItWorks />
      <FooterCTA />
      <CommunityCloser />
      <InstagramFeed />
    </>
  )
}
