import {defineArrayMember, defineType} from 'sanity'
import StringGenerator from '../../components/generator'

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
      description: <StringGenerator length={500} />,
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
      name: 'team',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'teamMember',
          fields: [
            {type: 'string', name: 'name'},
            {type: 'description', name: 'bio'},
            {name: 'headshot', type: 'imageInfo'},
          ],
        }),
      ],
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
