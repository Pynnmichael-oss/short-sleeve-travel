import { Hero } from '@/components/home/Hero'
import { SocialProofStrip } from '@/components/home/SocialProofStrip'
import { WhyWeExist } from '@/components/home/WhyWeExist'
import { Pricing } from '@/components/home/Pricing'
import { FeaturedTrips } from '@/components/home/FeaturedTrips'
import { UpcomingTrips } from '@/components/home/UpcomingTrips'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Testimonials } from '@/components/home/Testimonials'
import { CommunityCloser } from '@/components/home/CommunityCloser'
import { FooterCTA } from '@/components/home/FooterCTA'
import { getUpcomingTrips } from '@/lib/queries'

export default async function Home() {
  const upcomingTrips = await getUpcomingTrips()

  return (
    <>
      <Hero />
      <SocialProofStrip />
      <WhyWeExist />
      <Pricing />
      <FeaturedTrips />
      <UpcomingTrips trips={upcomingTrips} />
      <HowItWorks />
      <Testimonials />
      <CommunityCloser />
      <FooterCTA />
    </>
  )
}
