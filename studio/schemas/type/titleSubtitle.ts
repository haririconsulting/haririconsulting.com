import {defineArrayMember, defineType} from 'sanity'

const titleSubtitle = defineType({
  name: 'titleSubtitle',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      validation: (rule) => rule.required(),
    },
  ],
})

export default titleSubtitle
