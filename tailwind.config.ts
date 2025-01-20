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
          50: '#ecf0ff',
          100: '#dde3ff',
          200: '#c2cbff',
          300: '#9ca7ff',
          400: '#7578ff',
          500: '#635bff',
          600: '#4e36f5',
          700: '#432ad8',
          800: '#3725ae',
          900: '#302689',
          950: '#1e1650',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
