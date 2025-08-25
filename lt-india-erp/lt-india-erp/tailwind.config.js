/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#243C70',
          50: '#F0F4FF',
          100: '#E1E9FF',
          200: '#C3D3FF',
          300: '#A5BDFF',
          400: '#87A7FF',
          500: '#6991FF',
          600: '#4B7BFF',
          700: '#2D65FF',
          800: '#243C70',
          900: '#1A2B52',
        },
        accent: {
          DEFAULT: '#F6B801',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F6B801',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Roboto Slab', 'serif'],
      }
    },
  },
  plugins: [],
}