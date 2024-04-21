import {defineType} from 'sanity'

const siteInfo = defineType({
  name: 'siteInfo',
  type: 'document',
  fields: [
    {
      name: 'inspiration',
      type: 'text',
      description:
        "Tell me about what you're looking for out of this website. This is just for ideas, it won't be displayed on the site.",
    },
    {
      name: 'backgroundColor',
      type: 'string',
      description: (
        <div>
          The background color of your site. Copy the "Hex" from a color-picker such as{' '}
          <a href="https://htmlcolorcodes.com/color-picker/" target="_blank">
            this one
          </a>
        </div>
      ),
    },
    {
      name: 'foregroundColor',
      type: 'string',
      description: (
        <div>
          The foreground (text) color of your site. Copy the "Hex" from a color-picker such as{' '}
          <a href="https://htmlcolorcodes.com/color-picker/" target="_blank">
            this one
          </a>
        </div>
      ),
    },
    {
      name: 'accentColor',
      type: 'string',
      description: (
        <div>
          The accent color of your site, used for buttons and things that stand out. Copy the "Hex"
          from a color-picker such as{' '}
          <a href="https://htmlcolorcodes.com/color-picker/" target="_blank">
            this one
          </a>
        </div>
      ),
    },
    {
      name: 'bodyFont',
      type: 'fontInfo',
      description: (
        <div>
          The font for body text (descriptions and paragraphs). See{' '}
          <a href="https://fonts.google.com" target="_blank">
            Google Fonts
          </a>{' '}
          for a free library.
        </div>
      ),
    },
    {
      name: 'headingFont',
      type: 'fontInfo',
      description: (
        <div>
          The font for headings. See{' '}
          <a href="https://fonts.google.com" target="_blank">
            Google Fonts
          </a>{' '}
          for a free library.
        </div>
      ),
    },
  ],
})

export default siteInfo
