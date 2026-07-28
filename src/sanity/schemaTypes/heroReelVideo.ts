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
      name: 'poster',
      title: 'Poster Image',
      description: 'A still frame from the clip, picked from the photo pool. Used for the peeking side-slot preview in the hero carousel — videos never autoplay in that position. Optional, but recommended: without one, the peeking slot shows a plain placeholder block instead.',
      type: 'reference',
      to: [{ type: 'photo' }],
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
    select: { title: 'alt', media: 'poster.image' },
    prepare({ title, media }) {
      return { title: title ?? 'Hero reel video', subtitle: 'Video', media }
    },
  },
})
