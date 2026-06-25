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

export interface GalleryImage {
  _key: string
  asset: any
  hotspot?: any
  crop?: any
  caption?: string
  alt?: string
}

export interface Trip {
  _id: string
  title: string
  slug: { current: string }
  tagline: string
  description: string
  heroImage: any
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
