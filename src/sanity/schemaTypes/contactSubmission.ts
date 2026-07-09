import { defineField, defineType } from 'sanity'

export const contactSubmission = defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'name', title: 'Name', type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'email', title: 'Email', type: 'string',
      validation: R => R.required().email(),
    }),
    defineField({
      name: 'tripInterest', title: 'Trip Interest', type: 'reference',
      to: [{ type: 'trip' }], weak: true,
      description: 'Which trip this inquiry is about. Left blank for general inquiries.',
    }),
    defineField({
      name: 'message', title: 'Message', type: 'text', rows: 6,
      validation: R => R.required(),
    }),
    defineField({
      name: 'submittedAt', title: 'Submitted At', type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'status', title: 'Status', type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Replied', value: 'replied' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: { name: 'name', email: 'email', status: 'status', tripTitle: 'tripInterest.title' },
    prepare({ name, email, status, tripTitle }) {
      const emoji = status === 'replied' ? '✅' : status === 'read' ? '⚪' : '🟠'
      return {
        title: name,
        subtitle: `${emoji} ${email} · ${tripTitle || 'General inquiry'}`,
      }
    },
  },
})
