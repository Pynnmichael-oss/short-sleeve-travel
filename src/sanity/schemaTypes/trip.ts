import { defineField, defineType } from 'sanity'

export const trip = defineType({
  name: 'trip',
  title: 'Trip',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Trip Name', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'text', rows: 2 }),
    defineField({ name: 'description', title: 'Full Description', type: 'text', rows: 6 }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'durationDays', title: 'Duration (Days)', type: 'number' }),
    defineField({ name: 'priceFrom', title: 'Price From (USD)', type: 'number' }),
    defineField({ name: 'deposit', title: 'Deposit (USD)', type: 'number' }),
    defineField({ name: 'bookingUrl', title: 'TruTravels Booking URL', type: 'url' }),
    defineField({ name: 'destination', title: 'Destination', type: 'string' }),
    defineField({
      name: 'region', title: 'Region', type: 'string',
      options: { list: ['Asia', 'Oceania', 'Africa', 'Europe', 'Americas'] }
    }),
    defineField({
      name: 'departureDates', title: 'Departure Dates', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'startDate', title: 'Start Date', type: 'string' }),
        defineField({ name: 'endDate', title: 'End Date', type: 'string' }),
        defineField({ name: 'price', title: 'Price (USD)', type: 'number' }),
        defineField({ name: 'spotsRemaining', title: 'Spots Remaining', type: 'number' }),
        defineField({ name: 'available', title: 'Available', type: 'boolean', initialValue: true }),
      ]}]
    }),
    defineField({
      name: 'inclusions', title: "What's Included", type: 'object',
      fields: [
        defineField({ name: 'activities', title: 'Activities', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'accommodation', title: 'Accommodation', type: 'string' }),
        defineField({ name: 'transport', title: 'Transport', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'meals', title: 'Meals', type: 'array', of: [{ type: 'string' }] }),
      ]
    }),
    defineField({
      name: 'status',
      title: 'Trip Status',
      type: 'string',
      options: {
        list: [
          { title: '🟡 Coming Soon — show in "Where We\'re Going Next"', value: 'upcoming' },
          { title: '🟢 Active — show in Experiences, bookable now', value: 'active' },
          { title: '⚫ Past — show in Recent Destinations', value: 'past' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: R => R.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      description: 'Upload multiple photos for this trip. These appear in the trip detail page gallery.',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
        ]
      }],
      options: { layout: 'grid' },
    }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'destination', media: 'heroImage' }
  }
})
