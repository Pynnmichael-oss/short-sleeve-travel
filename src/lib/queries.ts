import { client } from './sanity'

export async function getAllTrips() {
  return client.fetch(`
    *[_type == "trip"] | order(order asc) {
      _id, title, slug, tagline, description,
      heroImage, durationDays, priceFrom, deposit,
      bookingUrl, destination, region,
      departureDates, inclusions, featured, order
    }
  `)
}

export async function getTripBySlug(slug: string) {
  return client.fetch(`
    *[_type == "trip" && slug.current == $slug][0] {
      _id, title, slug, tagline, description,
      heroImage, durationDays, priceFrom, deposit,
      bookingUrl, destination, region,
      departureDates, inclusions, featured
    }
  `, { slug })
}

export async function getFeaturedTrips() {
  return client.fetch(`
    *[_type == "trip" && featured == true] | order(order asc) {
      _id, title, slug, tagline, heroImage,
      durationDays, priceFrom, deposit, bookingUrl, destination
    }
  `)
}
