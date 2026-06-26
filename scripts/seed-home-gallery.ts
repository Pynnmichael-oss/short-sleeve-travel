import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'g80ygq4l',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function seed() {
  const existing = await client.fetch(`*[_type == "homeGallery"][0]`)
  if (existing) {
    console.log('homeGallery already exists, skipping')
    return
  }
  const result = await client.create({
    _type: 'homeGallery',
    caption: 'Real trips. Real people. Real memories.',
    photos: [],
  })
  console.log('Created homeGallery:', result._id)
}

seed().catch(console.error)
