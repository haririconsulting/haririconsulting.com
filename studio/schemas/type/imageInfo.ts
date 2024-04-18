import {defineType} from 'sanity'

const imageInfo = defineType({
  name: 'imageInfo',
  type: 'image',
  options: {
    hotspot: true,
  },

  fields: [
    {
      type: 'string',
      name: 'alt',
      description: 'Text for sight-impaired visitors.',
      validation: (rule) => rule.required(),
    },
    {
      type: 'string',
      name: 'photoCredit',
    },
  ],
})

export default imageInfo
