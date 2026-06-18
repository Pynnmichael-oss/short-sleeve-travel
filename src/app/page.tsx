import { Hero } from '@/components/home/Hero'
import { WhyWeExist } from '@/components/home/WhyWeExist'
import { FeaturedTrips } from '@/components/home/FeaturedTrips'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Testimonials } from '@/components/home/Testimonials'
import { CommunityCloser } from '@/components/home/CommunityCloser'
import { FooterCTA } from '@/components/home/FooterCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <WhyWeExist />
      <FeaturedTrips />
      <HowItWorks />
      <Testimonials />
      <CommunityCloser />
      <FooterCTA />
    </>
  )
}
