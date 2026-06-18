import { ExperiencesHero } from '@/components/experiences/ExperiencesHero'
import { FilteredTrips } from '@/components/experiences/FilteredTrips'
import { CustomRequest } from '@/components/experiences/CustomRequest'

export const metadata = {
  title: 'Experiences — Short Sleeve Travel',
  description:
    'Browse our curated group adventures. Patagonia, Oaxaca, the Azores — find the trip that calls to you.',
}

export default function ExperiencesPage() {
  return (
    <>
      <ExperiencesHero />
      <FilteredTrips />
      <CustomRequest />
    </>
  )
}
