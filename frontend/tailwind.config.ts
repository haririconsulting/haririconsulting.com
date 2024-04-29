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
      fontSize: {
        h1: '3rem',
        h2: '2.5rem',
        h3: '2rem',
        h4: '1.5rem',
      },
      lineHeight: {
        h: '1.5em',
      },
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        fg: 'var(--fg)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
      },
      fontFamily: {
        body: 'var(--body)',
        heading: 'var(--heading)',
      },
      dropShadow: {
        text: '0 0 6px rgb(0, 0, 0)',
      },
      height: {
        topbar: 'var(--topbar)',
        toppanel: 'calc(100vh - var(--topbar))',
        'toppanel-1/2': 'calc(50vh - var(--topbar) / 2)',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('child', '& > *')
    }),
  ],
} satisfies Config
