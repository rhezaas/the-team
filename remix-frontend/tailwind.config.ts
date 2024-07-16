import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '300px',
      sm: '640px',
      md: '720px',
      lg: '1080px',
    },
    extend: {
      colors: {
        'brand-bg': '#FAF8F4',
        'brand-gold': '#B79B54',
        'text-muted': '#767676',
        'gray-border': '#dad9d9',
      },
      fontSize: {
        'p4-tiny': '8px',
        p4: '10px',
        p3: '12px',
        p2: '14px',
        p1: '16px',
        h4: '18px',
        h3: '20px',
        h2: '22px',
        h1: '30px',
        h1lead: '42px',
      },
      fontFamily: {
        addington: [ "Addington CF", "serif" ],
        oswald: [ "Oswald", "sans" ],
		    inter: [ "Inter", "sans" ],
      },
    },
  },
  plugins: [],
} satisfies Config