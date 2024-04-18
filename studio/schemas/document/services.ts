import {defineField, defineType} from 'sanity'

const services = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  description:
    'What categories of service do you provide? These are used to categorize projects, so enter them first.',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 32,
      },
    }),
    defineField({
      name: 'description',
      type: 'description',
    }),
  ],
})

export default services
