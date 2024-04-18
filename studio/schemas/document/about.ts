import {defineType} from 'sanity'

const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', initialValue: 'About Me'},
    {
      name: 'bio',
      type: 'description',
      validation: (rule) => rule.required(),
    },
    {
      name: 'headshot',
      type: 'image',
      validation: (rule) => rule.required(),
    },
    {
      name: 'slogan',
      type: 'string',
      validation: (rule) => rule.required(),
      description:
        'A short, one-sentence description of what your mission is (displayed on your front page).',
      placeholder: 'Being awesome since the dawn of time.',
    },
    {
      name: 'guidingPrinciples',
      type: 'array',
      of: [{type: 'titleSubtitle'}],
    },
    {
      name: 'cv',
      type: 'file',
      options: {accept: 'application/pdf'},
    },
    {
      name: 'resume',
      type: 'file',
      options: {accept: 'application/pdf'},
    },
    {
      name: 'contactInfo',
      type: 'buttonInfo',
    },
    {
      name: 'calendarInfo',
      type: 'buttonInfo',
    },
  ],
  preview: {
    select: {
      title: 'Bio',
    },
  },
})

export default about
