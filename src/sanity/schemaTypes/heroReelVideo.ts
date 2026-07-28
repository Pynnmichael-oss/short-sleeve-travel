import { defineField, defineType } from 'sanity'

export const heroReelVideo = defineType({
  name: 'heroReelVideo',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'video',
      title: 'Video Clip',
      type: 'file',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the video clip for accessibility.',
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: { title: 'alt' },
    prepare({ title }) {
      return { title: title ?? 'Hero reel video', subtitle: 'Video' }
    },
  },
})
