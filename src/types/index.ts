export type TripCategory = 'Adventure' | 'Cultural'
export type Difficulty = 'Easy' | 'Moderate' | 'Challenging'

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface PersonaCard {
  type: string
  description: string
}

export interface Trip {
  id: string
  slug: string
  destination: string
  country: string
  tagline: string
  category: TripCategory
  duration: number
  groupSize: number
  price: number
  difficulty: Difficulty
  image: string
  heroImage: string
  galleryImages: string[]
  description: string
  hook: string
  highlights: string[]
  itinerary: ItineraryDay[]
  included: string[]
  notIncluded: string[]
  whoItsFor: PersonaCard[]
}
