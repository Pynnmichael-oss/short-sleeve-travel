import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        forest: '#2C4A3E',
        sand: '#C8A97E',
        offwhite: '#F5F0E8',
        charcoal: '#2A2A2A',
        burnt: '#D4622A',
        warmwhite: '#FAFAF7',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
}

export default config
