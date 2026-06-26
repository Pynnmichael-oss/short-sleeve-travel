import { ExperiencesHero } from '@/components/experiences/ExperiencesHero'
import { FilteredTrips } from '@/components/experiences/FilteredTrips'
import { CustomRequest } from '@/components/experiences/CustomRequest'
import { UpcomingTrips } from '@/components/home/UpcomingTrips'
import { getActiveTrips, getUpcomingTrips } from '@/lib/queries'

export const metadata = {
  title: 'Trips — Short Sleeve Travel',
  description:
    'Browse our curated group adventures. New Zealand, Japan, Morocco — find the trip that calls to you.',
}

export default async function TripsPage() {
  const [trips, upcomingTrips] = await Promise.all([getActiveTrips(), getUpcomingTrips()])

  return (
    <>
      <ExperiencesHero />
      <FilteredTrips trips={trips} />
      <UpcomingTrips trips={upcomingTrips} />
      <CustomRequest />
    </>
  )
}
