export type TripCategory = 'Hiking' | 'Cultural' | 'Beach & Islands'

export interface Trip {
  id: string
  destination: string
  country: string
  tagline: string
  category: TripCategory
  duration: number
  groupSize: number
  price: number
  image: string
  description: string
  highlights: string[]
}
