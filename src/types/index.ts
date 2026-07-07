export interface DepartureDate {
  _key: string
  startDate: string
  endDate: string
  price: number
  spotsRemaining?: number
  available: boolean
}

export interface TripInclusions {
  activities: string[]
  accommodation: string
  transport: string[]
  meals: string[]
}

export interface PhotoRef {
  _id?: string
  image: any
  alt?: string
  caption?: string
}

export type GalleryImage = PhotoRef

export interface Trip {
  _id: string
  title: string
  slug: { current: string }
  tagline: string
  description: string
  heroImage: PhotoRef
  durationDays: number
  priceFrom: number
  deposit: number
  bookingUrl: string
  destination: string
  region: string
  departureDates: DepartureDate[]
  inclusions: TripInclusions
  featured: boolean
  order: number
  status?: 'active' | 'upcoming' | 'past'
  gallery?: GalleryImage[]
}
