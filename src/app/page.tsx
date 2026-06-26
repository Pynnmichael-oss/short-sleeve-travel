import { Hero } from '@/components/home/Hero'
import { SocialProofStrip } from '@/components/home/SocialProofStrip'
import { WhyWeExist } from '@/components/home/WhyWeExist'
import { Pricing } from '@/components/home/Pricing'
import { UpcomingTrips } from '@/components/home/UpcomingTrips'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Testimonials } from '@/components/home/Testimonials'
import { CommunityCloser } from '@/components/home/CommunityCloser'
import { FooterCTA } from '@/components/home/FooterCTA'
import { getUpcomingTrips, getHomeGallery } from '@/lib/queries'

export default async function Home() {
  const [upcomingTrips, gallery] = await Promise.all([
    getUpcomingTrips(),
    getHomeGallery(),
  ])

  return (
    <>
      <Hero />
      <SocialProofStrip gallery={gallery} />
      <WhyWeExist />
      <Pricing />
      <UpcomingTrips trips={upcomingTrips} />
      <HowItWorks />
      <Testimonials />
      <CommunityCloser />
      <FooterCTA />
    </>
  )
}
