import {defineType} from 'sanity'

const fontInfo = defineType({
  type: 'object',
  name: 'fontInfo',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'linkType',
      type: 'string',
      options: {list: ['link', 'file'], layout: 'radio'},
    },
    {
      type: 'file',
      name: 'uploadSource',
      hidden: (context) => {
        return context.parent?.['linkType'] !== 'file'
      },
      validation: (rule) =>
        rule.custom((value, context) =>
          context.parent?.['linkType'] !== 'file' || value ? true : 'Please add a file.',
        ),
    },
    {
      type: 'url',
      name: 'linkSource',
      hidden: (context) => {
        console.log('context', context)

        return context.parent?.['linkType'] !== 'link'
      },
      validation: (rule) =>
        rule.custom((value, context) =>
          context.parent?.['linkType'] !== 'link' || value ? true : 'Please add a link.',
        ),
    },
  ],
})

export default fontInfo
