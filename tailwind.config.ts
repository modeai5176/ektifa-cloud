import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette — deliberately restrained, material-led
        obsidian: '#0b0a09',
        cacao: {
          DEFAULT: '#2a1a12',
          deep: '#1a0f0a',
          rich: '#3d2619',
        },
        date: '#4a3220',
        sand: {
          DEFAULT: '#c9b79c',
          warm: '#d8c4a6',
          pale: '#e8ddc9',
        },
        stone: {
          DEFAULT: '#8a8072',
          light: '#b4ab9c',
          dark: '#56504a',
        },
        bone: '#efe9dd',
        ivory: '#f6f2e9',
        pearl: '#f9f7f2',
        olive: '#6b6a4b',
        brass: {
          DEFAULT: '#a8864e',
          light: '#c3a876',
          deep: '#8a6d3d',
        },
        amber: {
          DEFAULT: '#c88a2e',
          light: '#e0a94a',
          deep: '#9a641d',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        luxe: '0.02em',
        wide: '0.14em',
        widest: '0.32em',
        mega: '0.5em',
      },
      fontSize: {
        '10xl': '11rem',
        '11xl': '14rem',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
        reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      maxWidth: {
        maison: '1680px',
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'drift-slow': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-2%,0) scale(1.03)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(1.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scroll-hint': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      animation: {
        'drift-slow': 'drift-slow 18s ease-in-out infinite',
        'fade-up': 'fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scroll-hint': 'scroll-hint 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
