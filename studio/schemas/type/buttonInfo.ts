import {defineType} from 'sanity'

const buttonInfo = defineType({
  name: 'buttonInfo',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'link',
      type: 'url',
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
})

export default buttonInfo
