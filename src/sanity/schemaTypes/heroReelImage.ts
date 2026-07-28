import { defineField, defineType } from 'sanity'

export const heroReelImage = defineType({
  name: 'heroReelImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'reference',
      to: [{ type: 'photo' }],
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: { media: 'photo.image', title: 'photo.alt' },
    prepare({ media, title }) {
      return { title: title ?? 'Hero reel image', subtitle: 'Image', media }
    },
  },
})
