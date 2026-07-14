import { ExperiencesHero } from '@/components/experiences/ExperiencesHero'
import { FilteredTrips } from '@/components/experiences/FilteredTrips'
import { CustomRequest } from '@/components/experiences/CustomRequest'
import { getUpcomingTrips } from '@/lib/queries'

export const metadata = {
  title: 'Trips — The Shortsleeve Travel Club',
  description:
    'Browse our curated group adventures. New Zealand, Japan, Morocco — find the trip that calls to you.',
}

export default async function TripsPage() {
  const trips = await getUpcomingTrips()

  return (
    <>
      <ExperiencesHero />
      <FilteredTrips trips={trips} />
      <CustomRequest />
    </>
  )
}
