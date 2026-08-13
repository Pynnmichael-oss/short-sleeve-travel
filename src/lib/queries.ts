import { client } from './sanity'

export async function getAllTrips() {
  return client.fetch(`
    *[_type == "trip"] | order(order asc) {
      _id, title, slug, tagline, description,
      heroImage->{ image, alt, caption },
      gallery[]->{ _id, image, alt, caption },
      priceFrom, deposit, bookingUrl,
      region, departureDates, inclusions, featured, order, status
    }
  `)
}

export async function getTripBySlug(slug: string) {
  return client.fetch(`
    *[_type == "trip" && slug.current == $slug][0] {
      _id, title, slug, tagline, description,
      heroImage->{ image, alt, caption },
      gallery[]->{ _id, image, alt, caption },
      priceFrom, deposit, bookingUrl,
      region, departureDates, inclusions, featured, status
    }
  `, { slug })
}

export async function getUpcomingTrips() {
  return client.fetch(`
    *[_type == "trip" && status == "upcoming"] | order(order asc) {
      _id, title, slug, tagline, description,
      heroImage->{ image, alt, caption },
      gallery[]->{ _id, image, alt, caption },
      priceFrom, deposit, bookingUrl, region, inclusions
    }
  `)
}

export async function getPastTrips() {
  return client.fetch(`
    *[_type == "trip" && status == "past"] | order(order desc) {
      _id, title, slug, tagline,
      heroImage->{ image, alt, caption },
      priceFrom, region, departureDates
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
      priceFrom, deposit, bookingUrl
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

// Dedicated query for the /hero-demo split hero — kept separate from
// getHomeGallery() even though both read the homeGallery singleton, since
// this route is disposable and shouldn't couple to the live carousel query.
export async function getHeroReel() {
  return client.fetch(`
    *[_type == "homeGallery"][0] {
      heroReel[]{
        _type,
        _type == "heroReelImage" => {
          photo->{ image, alt, caption }
        },
        _type == "heroReelVideo" => {
          "asset": video.asset->{ url },
          alt,
          poster->{ image, alt }
        }
      }
    }
  `)
}

// Dedicated query for the Where We've Been globe pins — kept separate from
// getPastTrips() (which feeds the photo grid on the same page with a very
// different field set). Only trips with a location set will actually plot;
// GlobeMap filters out any without one.
export async function getGlobeTrips() {
  return client.fetch(`
    *[_type == "trip" && status == "past"] {
      _id, title, slug, location
    }
  `)
}
