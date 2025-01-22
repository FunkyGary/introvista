import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#9900FF',
          50: '#F5E6FF',
          100: '#E5CCFF',
          200: '#D1A3FF',
          300: '#BC7AFF',
          400: '#AB3DFF',
          500: '#9900FF',
          600: '#7700CC',
          700: '#5C009F',
          800: '#400073',
          900: '#2B004D',
          950: '#1A002E',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
