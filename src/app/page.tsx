import { Hero } from '@/components/home/Hero'
import { WhyWeExist } from '@/components/home/WhyWeExist'
import { PhotoCarousel } from '@/components/PhotoCarousel'
import { Pricing } from '@/components/home/Pricing'
import { UpcomingTrips } from '@/components/home/UpcomingTrips'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Testimonials } from '@/components/home/Testimonials'
import { CommunityCloser } from '@/components/home/CommunityCloser'
import { FooterCTA } from '@/components/home/FooterCTA'
import { getUpcomingTrips, getHomeGallery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

const FALLBACK_PHOTOS = [
  { src: '/short-sleeve-travel/images/tent-selfie.jpg',   alt: 'Friends taking a selfie at camp' },
  { src: '/short-sleeve-travel/images/slip-slide.jpg',    alt: 'Group on a water slide' },
  { src: '/short-sleeve-travel/images/friends-hug.jpg',   alt: 'Travellers hugging at a destination' },
  { src: '/short-sleeve-travel/images/vineyard-girls.jpg', alt: 'Girls at a vineyard' },
]

export default async function Home() {
  const [upcomingTrips, gallery] = await Promise.all([
    getUpcomingTrips(),
    getHomeGallery(),
  ])

  const photos = gallery?.photos?.length
    ? gallery.photos
        .filter((p: any) => p?.asset)
        .map((p: any, i: number) => ({
          src: urlFor(p).width(900).height(900).url(),
          alt: p.alt ?? `Trip photo ${i + 1}`,
        }))
    : FALLBACK_PHOTOS

  const caption = gallery?.caption ?? 'Real trips. Real people. Real memories.'

  return (
    <>
      <Hero />
      <WhyWeExist />
      <PhotoCarousel photos={photos} caption={caption} />
      <Pricing />
      <UpcomingTrips trips={upcomingTrips} />
      <HowItWorks />
      <Testimonials />
      <CommunityCloser />
      <FooterCTA />
    </>
  )
}
