import { defineField, defineType } from 'sanity'

export const trip = defineType({
  name: 'trip',
  title: 'Trip',
  type: 'document',
  groups: [
    { name: 'content', title: '✍️ Content', default: true },
    { name: 'media', title: '🖼️ Media' },
    { name: 'pricing', title: '💰 Pricing & Booking' },
    { name: 'scheduling', title: '📅 Dates & Availability' },
    { name: 'settings', title: '⚙️ Settings' },
  ],
  fields: [
    defineField({
      name: 'title', title: 'Trip Name', type: 'string', group: 'content',
      validation: R => R.required(),
    }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', group: 'content',
      options: { source: 'title' },
      validation: R => R.required(),
    }),
    defineField({
      name: 'destination', title: 'Destination', type: 'string', group: 'content',
      description: 'Start and end point of the trip e.g. "Auckland to Queenstown"',
    }),
    defineField({
      name: 'region', title: 'Region', type: 'string', group: 'content',
      options: { list: ['Asia', 'Oceania', 'Africa', 'Europe', 'Americas'] },
      description: 'Used for filtering on the Experiences page.',
    }),
    defineField({
      name: 'tagline', title: 'Tagline', type: 'text', rows: 2, group: 'content',
      description: 'A short punchy line that sells the trip. Shown on cards and previews. Aim for under 100 characters.',
    }),
    defineField({
      name: 'description', title: 'Full Description', type: 'text', rows: 6, group: 'content',
      description: 'The main trip description shown on the experience detail page.',
    }),
    defineField({
      name: 'inclusions', title: "What's Included", type: 'object', group: 'content',
      fields: [
        defineField({ name: 'activities', title: 'Activities', type: 'array', of: [{ type: 'string' }], description: 'List of included activities and highlights.' }),
        defineField({ name: 'accommodation', title: 'Accommodation', type: 'string', description: 'e.g. "12 nights shared dorm rooms"' }),
        defineField({ name: 'transport', title: 'Transport', type: 'array', of: [{ type: 'string' }], description: 'e.g. "Private minivan", "Bullet Train"' }),
        defineField({ name: 'meals', title: 'Meals', type: 'array', of: [{ type: 'string' }], description: 'e.g. "2x Lunch", "1x Welcome Dinner"' }),
      ],
    }),
    defineField({
      name: 'heroImage', title: 'Hero Image', type: 'image', group: 'media',
      options: { hotspot: true },
      description: 'Main image shown at the top of the trip detail page and on cards. Use a high quality landscape photo.',
    }),
    defineField({
      name: 'gallery', title: 'Photo Gallery', type: 'array', group: 'media',
      description: 'Upload multiple photos for this trip. These appear in the gallery section on the detail page.',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({ name: 'caption', title: 'Caption', type: 'string', description: 'Optional caption shown below the photo.' }),
          defineField({ name: 'alt', title: 'Alt Text', type: 'string', description: 'Describe the image for accessibility and SEO.' }),
        ],
      }],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'priceFrom', title: 'Price From (USD)', type: 'number', group: 'pricing',
      description: 'The lowest available price for this trip. Used for display only — actual prices are set per departure date.',
    }),
    defineField({
      name: 'deposit', title: 'Deposit (USD)', type: 'number', group: 'pricing',
      description: 'Amount required to secure a booking. Typically 10–20% of the trip price.',
    }),
    defineField({
      name: 'bookingUrl', title: 'TruTravels Booking URL', type: 'url', group: 'pricing',
      description: 'The full URL where travelers can book this trip on TruTravels. Must start with https://',
    }),
    defineField({
      name: 'departureDates', title: 'Departure Dates', type: 'array', group: 'scheduling',
      description: 'Add all available departure dates for this trip. Each date can have its own price and availability.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'startDate', title: 'Start Date', type: 'date', description: 'First day of the trip.' }),
          defineField({ name: 'endDate', title: 'End Date', type: 'date', description: 'Last day of the trip.' }),
          defineField({ name: 'price', title: 'Price (USD)', type: 'number', description: 'Price per person for this departure.' }),
          defineField({ name: 'spotsRemaining', title: 'Spots Remaining', type: 'number', description: 'Leave blank if unknown.' }),
          defineField({ name: 'available', title: 'Available for Booking', type: 'boolean', initialValue: true, description: 'Uncheck to hide this date from the booking section.' }),
        ],
        preview: {
          select: { start: 'startDate', end: 'endDate', price: 'price' },
          prepare({ start, end, price }: any) {
            return { title: `${start || 'TBD'} → ${end || 'TBD'}`, subtitle: price ? `$${price} per person` : 'Price TBD' }
          }
        }
      }],
    }),
    defineField({
      name: 'status', title: 'Trip Status', type: 'string', group: 'settings',
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
      name: 'featured', title: 'Featured on Homepage', type: 'boolean', group: 'settings',
      initialValue: false,
      description: 'Toggle on to feature this trip in the homepage hero section.',
    }),
    defineField({
      name: 'durationDays', title: 'Duration (Days)', type: 'number', group: 'settings',
      description: 'Total number of days including travel days.',
    }),
    defineField({
      name: 'order', title: 'Display Order', type: 'number', group: 'settings',
      description: 'Lower numbers appear first on the Experiences page. Leave blank to use default ordering.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'destination', media: 'heroImage' },
  },
})
