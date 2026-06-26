import { client } from './sanity'

export async function getAllTrips() {
  return client.fetch(`
    *[_type == "trip"] | order(order asc) {
      _id, title, slug, tagline, description, heroImage, gallery,
      durationDays, priceFrom, deposit, bookingUrl,
      destination, region, departureDates, inclusions, featured, order, status
    }
  `)
}

export async function getTripBySlug(slug: string) {
  return client.fetch(`
    *[_type == "trip" && slug.current == $slug][0] {
      _id, title, slug, tagline, description, heroImage, gallery,
      durationDays, priceFrom, deposit, bookingUrl,
      destination, region, departureDates, inclusions, featured, status
    }
  `, { slug })
}

export async function getActiveTrips() {
  return client.fetch(`
    *[_type == "trip" && status == "active"] | order(order asc) {
      _id, title, slug, tagline, description, heroImage, gallery,
      durationDays, priceFrom, deposit, bookingUrl,
      destination, region, departureDates, inclusions, featured, order
    }
  `)
}

export async function getUpcomingTrips() {
  return client.fetch(`
    *[_type == "trip" && status == "upcoming"] | order(order asc) {
      _id, title, slug, tagline, heroImage,
      durationDays, priceFrom, deposit, bookingUrl, destination, region
    }
  `)
}

export async function getPastTrips() {
  return client.fetch(`
    *[_type == "trip" && status == "past"] | order(order desc) {
      _id, title, slug, tagline, heroImage,
      durationDays, priceFrom, destination, region, departureDates
    }
  `)
}

export async function getHomeGallery() {
  return client.fetch(`
    *[_type == "homeGallery"][0] {
      photos[] { asset, caption, alt },
      caption
    }
  `)
}

export async function getFeaturedTrips() {
  return client.fetch(`
    *[_type == "trip" && featured == true] | order(order asc) {
      _id, title, slug, tagline, heroImage,
      durationDays, priceFrom, deposit, bookingUrl, destination
    }
  `)
}
