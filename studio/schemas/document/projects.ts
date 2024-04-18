import {defineField, defineType} from 'sanity'

const project = defineType({
  name: 'projects',
  type: 'document',
  description: 'Enter examples of projects you want to showcase in your portfolio',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'type',
      type: 'reference',
      to: [{type: 'services'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'description',
    }),
    defineField({
      name: 'videoBanner',
      type: 'file',
      options: {
        accept: 'video/webm',
      },
      description:
        'A 5-10 second WebM video with no audio. Use CloudConvert to create one if needed!',
    }),
    defineField({
      name: 'imageBanner',
      type: 'imageInfo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'documentPreviews',
      type: 'array',
      of: [
        {
          type: 'assetInfo',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'imageBanner',
    },
  },
  // orderings: [
  //   {
  //     title: 'Most Recent',
  //     name: 'releaseDateDesc',
  //     by: [{field: 'releaseDate', direction: 'desc'}],
  //   },
  // ],
})

export default project
