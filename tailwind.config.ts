import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light, warm, material-led palette drawn from the real EKTIFA brand
        paper: {
          DEFAULT: '#f6f3ec', // main warm off-white ground
          deep: '#efeae0', // alternating section ground
        },
        cream: '#e9e2d3', // Coast Pearl / card tone
        ink: {
          DEFAULT: '#221c17', // primary text — warm near-black
          soft: '#4a433c',
        },
        muted: '#8a8075', // secondary text
        line: '#ddd5c7', // hairlines and borders
        // Brand accents (from the EKTIFA mark)
        sage: {
          DEFAULT: '#59916d',
          deep: '#3f6e51',
          soft: '#8bb199',
        },
        honey: {
          DEFAULT: '#c3952f',
          light: '#e0b454',
          foil: '#c89b3c',
        },
        // Product colourways
        terracotta: '#b35f33', // Desert Sand
        olive: '#808560', // Oasis Olive
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'serif'],
      },
      letterSpacing: {
        luxe: '0.02em',
        wide: '0.14em',
        widest: '0.28em',
      },
      fontSize: {
        '10xl': '9rem',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      maxWidth: {
        maison: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
