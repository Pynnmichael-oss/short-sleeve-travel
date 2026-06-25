import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        'sst-nav':     '#2E4A5A',
        'sst-navy':    '#1A2B3C',
        'sst-amber':   '#E8A020',
        'sst-body':    '#2D2D2D',
        'sst-white':   '#FFFFFF',
        'sst-surface': '#F7F8FA',
        'sst-sand':    '#C8A97E',
        'sst-map':     '#4AABE8',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
}

export default config
