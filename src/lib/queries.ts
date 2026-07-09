import { client } from './sanity'

export async function getAllTrips() {
  return client.fetch(`
    *[_type == "trip"] | order(order asc) {
      _id, title, slug, tagline, description,
      heroImage->{ image, alt, caption },
      gallery[]->{ _id, image, alt, caption },
      durationDays, priceFrom, deposit, bookingUrl,
      destination, region, departureDates, inclusions, featured, order, status
    }
  `)
}

export async function getTripBySlug(slug: string) {
  return client.fetch(`
    *[_type == "trip" && slug.current == $slug][0] {
      _id, title, slug, tagline, description,
      heroImage->{ image, alt, caption },
      gallery[]->{ _id, image, alt, caption },
      durationDays, priceFrom, deposit, bookingUrl,
      destination, region, departureDates, inclusions, featured, status
    }
  `, { slug })
}

export async function getUpcomingTrips() {
  return client.fetch(`
    *[_type == "trip" && status == "upcoming"] | order(order asc) {
      _id, title, slug, tagline, description,
      heroImage->{ image, alt, caption },
      gallery[]->{ _id, image, alt, caption },
      durationDays, priceFrom, deposit, bookingUrl, destination, region, inclusions
    }
  `)
}

export async function getPastTrips() {
  return client.fetch(`
    *[_type == "trip" && status == "past"] | order(order desc) {
      _id, title, slug, tagline,
      heroImage->{ image, alt, caption },
      durationDays, priceFrom, destination, region, departureDates
    }
  `)
}

export async function getHomeGallery() {
  return client.fetch(`
    *[_type == "homeGallery"][0] {
      photos[]->{ image, alt, caption },
      caption
    }
  `)
}

export async function getFeaturedTrips() {
  return client.fetch(`
    *[_type == "trip" && featured == true] | order(order asc) {
      _id, title, slug, tagline,
      heroImage->{ image, alt, caption },
      durationDays, priceFrom, deposit, bookingUrl, destination
    }
  `)
}

// Dedicated, unsliced query for the contact form's trip dropdown — kept
// separate from getUpcomingTrips so changes to homepage/trips-page display
// logic (slicing, featured-first ordering, etc.) never affect the dropdown.
export async function getTripsForContactForm() {
  return client.fetch(`
    *[_type == "trip" && status == "upcoming"] | order(order asc) {
      _id, title
    }
  `)
}
