import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'g80ygq4l',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function updateStatuses() {
  const trips = await client.fetch(`*[_type == "trip"]{ _id, title }`)
  for (const trip of trips) {
    await client.patch(trip._id).set({ status: 'active' }).commit()
    console.log(`Updated: ${trip.title} → active`)
  }
}

updateStatuses().catch(console.error)
