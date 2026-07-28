import { defineField, defineType } from 'sanity'

export const homeGallery = defineType({
  name: 'homeGallery',
  title: 'Homepage Photo Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'photos',
      title: 'Carousel Photos',
      description: 'Pick photos from the pool that appear in the homepage carousel strip. Aim for 4-6 square-crop photos showing real trip moments.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'photo' }] }],
      options: { layout: 'grid' },
      validation: (R) => R.min(1).max(8),
    }),
    defineField({
      name: 'caption',
      title: 'Strip Caption',
      type: 'string',
      description: 'The caption shown below the photo strip.',
      initialValue: 'Real trips. Real people. Real memories.',
    }),
    defineField({
      name: 'heroReel',
      title: 'Hero Reel (split hero demo)',
      description: 'Images and/or video clips that auto-rotate in the split hero design (/hero-demo). Aim for tall/portrait-friendly crops since the desktop panel is 9:16. Compress video clips before uploading — aim for under ~10MB per clip (H.264 video, AAC audio, MP4 container) to keep bandwidth usage low on the free Sanity plan.',
      type: 'array',
      of: [{ type: 'heroReelImage' }, { type: 'heroReelVideo' }],
      validation: (R) => R.min(2).max(6),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Photo Carousel' }
    }
  }
})
