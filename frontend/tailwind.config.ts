import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        mouse: { raw: '(hover: none)' },
        touch: { raw: '(hover)' },
        '-md': { max: '767px' },
        '-lg': { max: '1023px' },
        tall: { raw: '(min-height: 700px)' },
      },
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        body: 'var(--body)',
        heading: 'var(--heading)',
      },
      dropShadow: {
        text: '0 0 6px rgb(0, 0, 0)',
      },
      height: {
        topbar: '100px',
        toppanel: 'calc(100vh - 100px)',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('child', '& > *')
    }),
  ],
} satisfies Config
