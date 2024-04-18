import {PreviewConfig, PreviewValue, defineArrayMember, defineType} from 'sanity'

const assetInfo = defineType({
  name: 'assetInfo',
  type: 'object',
  preview: {
    select: {
      linkSource: 'linkSource',
      uploadSource: 'uploadSource',
      assetType: 'assetType',
      title: 'title',
      description: 'description',
    },
    prepare: ({linkSource, uploadSource, assetType, title, description}) => ({
      title: title ?? description ?? (assetType === 'uploadSource' ? uploadSource : linkSource),
    }),
  },
  fields: [
    {
      type: 'string',
      name: 'assetType',
      options: {list: ['link', 'file'], layout: 'radio'},
      validation: (rule) => rule.required(),
    },
    {
      type: 'file',
      name: 'uploadSource',
      hidden: (context) => {
        return context.parent['assetType'] !== 'file'
      },
      validation: (rule) =>
        rule.custom((value, context) =>
          (context.parent as any)['assetType'] !== 'file' || value ? true : 'Please add a file.',
        ),
    },
    {
      type: 'url',
      name: 'linkSource',
      hidden: (context) => context.parent['assetType'] !== 'link',
      validation: (rule) =>
        rule.custom((value, context) =>
          (context.parent as any)['assetType'] !== 'link' || value ? true : 'Please add a link.',
        ),
    },
    {type: 'boolean', name: 'embed', initialValue: true},
    {
      type: 'string',
      name: 'title',
      description:
        'If embedding, provides a heading title. If linking out, provides text for the button (default: "See more").',
    },
    {type: 'text', name: 'description', rows: 3},
  ],
})

export default assetInfo
