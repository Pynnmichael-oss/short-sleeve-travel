import { defineField, defineType } from 'sanity'

export const homeGallery = defineType({
  name: 'homeGallery',
  title: 'Homepage Photo Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'photos',
      title: 'Carousel Photos',
      description: 'Add, remove, or reorder photos that appear in the homepage carousel strip. Aim for 4-6 square-crop photos showing real trip moments.',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
        ]
      }],
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
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Photo Carousel' }
    }
  }
})
