'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { googleMapsInput } from '@sanity/google-maps-input'
import { schemaTypes } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'ShortSleeve Travel',
  projectId: 'g80ygq4l',
  dataset: 'production',
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
    googleMapsInput({ apiKey: process.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY! }),
  ],
  schema: { types: schemaTypes },
})
