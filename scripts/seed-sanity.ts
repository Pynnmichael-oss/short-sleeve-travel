import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'g80ygq4l',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const trips = [
  {
    _type: 'trip',
    title: 'New Zealand Adventure',
    slug: { _type: 'slug', current: 'new-zealand-adventure' },
    tagline: '13 days of breathtaking landscapes, Hobbiton, Milford Sound, and memories that last a lifetime.',
    description: "We're going BIG for this New Zealand Adventure. Get ready to kick things off in Auckland before discovering Rotorua's geothermal magic and Taupo's 10/10 vibes. Think kayaking on crystal-clear waters, exploring Hobbiton, and chasing waterfalls at Huka Falls. Then it's over to the South Island with bucket-list spots like Christchurch, Wanaka, and Queenstown.",
    durationDays: 13,
    priceFrom: 2595,
    deposit: 280,
    bookingUrl: 'https://shortsleevetravel.trutravels.com/13-day-new-zealand-adventure',
    destination: 'Auckland to Queenstown',
    region: 'Oceania',
    featured: true,
    order: 1,
    departureDates: [
      { _key: 'nz-1', startDate: 'Jan 28, 2027', endDate: 'Feb 9, 2027', price: 2595, available: true }
    ],
    inclusions: {
      activities: ['Waitomo Caves', 'Hobbiton', 'Milford Sound cruise', 'Maori Cultural Evening', 'Kayaking on Lake Taupo', 'Hooker Valley Track', 'Wanaka Tree', 'Huka Falls'],
      accommodation: '12 nights shared dorm rooms',
      transport: ['Private minivan', 'Public bus', 'Flight from Auckland to Christchurch'],
      meals: ['2x Lunch', '1x Dinner'],
    }
  },
  {
    _type: 'trip',
    title: 'Spirit of Japan',
    slug: { _type: 'slug', current: 'spirit-of-japan' },
    tagline: '7 days across Tokyo, Hakone, and Kyoto — samurai classes, sake tasting, and bamboo forests.',
    description: "Want a whistlestop tour of Japan? Look no further. From a Samurai class and sake tasting to wandering through the stunning Arashiyama Bamboo Forest, we're cramming bucket-list activities into one incredible week across Tokyo, Kyoto, and Hakone.",
    durationDays: 7,
    priceFrom: 1595,
    deposit: 280,
    bookingUrl: 'https://shortsleevetravel.trutravels.com/japan',
    destination: 'Tokyo to Kyoto',
    region: 'Asia',
    featured: true,
    order: 2,
    departureDates: [
      { _key: 'jp-1', startDate: 'Dec 3, 2026', endDate: 'Dec 9, 2026', price: 1595, available: true }
    ],
    inclusions: {
      activities: ['Senso-Ji Temple', 'Sake Tasting', 'Samurai Experience', 'Arashiyama Bamboo Forest', 'Fushimi-Inari Red Gates', 'Golden Temple', 'Tea Ceremony', 'Pirate Ship Cruise'],
      accommodation: '6 nights — mix of hostel dorms and twin share rooms',
      transport: ['Public transport', 'Bullet Train (Shinkansen)'],
      meals: [],
    }
  },
  {
    _type: 'trip',
    title: 'Morocco Uncovered',
    slug: { _type: 'slug', current: 'morocco-uncovered' },
    tagline: '9 days of markets, desert glamping, sandboarding, and tagine in the heart of North Africa.',
    description: "Join Shortsleeve Travel for 9 epic days across Morocco — think markets, desert glamping, tagine, sandboarding and more. Starting and ending in Marrakech, this trip packs in everything Morocco has to offer.",
    durationDays: 9,
    priceFrom: 1195,
    deposit: 280,
    bookingUrl: 'https://shortsleevetravel.trutravels.com/morocco-uncovered',
    destination: 'Marrakech to Marrakech',
    region: 'Africa',
    featured: true,
    order: 3,
    departureDates: [],
    inclusions: {
      activities: ['Marrakech Medina', 'Sahara Desert glamping', 'Sandboarding', 'Camel trekking', 'Fes Medina', 'Atlas Mountains'],
      accommodation: '8 nights — mix of riads and desert camp',
      transport: ['Private transport'],
      meals: ['Multiple group dinners'],
    }
  }
]

async function seed() {
  for (const trip of trips) {
    const result = await client.create(trip)
    console.log(`Created: ${result.title} (${result._id})`)
  }
}

seed().catch(console.error)
