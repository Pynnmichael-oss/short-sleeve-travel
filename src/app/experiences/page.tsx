import { ExperiencesHero } from '@/components/experiences/ExperiencesHero'
import { FilteredTrips } from '@/components/experiences/FilteredTrips'
import { CustomRequest } from '@/components/experiences/CustomRequest'
import { getActiveTrips } from '@/lib/queries'

export const metadata = {
  title: 'Experiences — Short Sleeve Travel',
  description:
    'Browse our curated group adventures. New Zealand, Japan, Morocco — find the trip that calls to you.',
}

export default async function ExperiencesPage() {
  const trips = await getActiveTrips()
  return (
    <>
      <ExperiencesHero />
      <FilteredTrips trips={trips} />
      <CustomRequest />
    </>
  )
}
