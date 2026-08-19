/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f7fb',
          100: '#dbeef6',
          200: '#b8deed',
          300: '#8ac8e0',
          400: '#54a9cb',
          500: '#2f8ab0',
          600: '#216f93',
          700: '#1c5977',
          800: '#1b4a61',
          900: '#1a3f52',
          950: '#0f2733',
        },
        sand: {
          50: '#fdfaf5',
          100: '#f8f0e3',
          200: '#f0e2c8',
          300: '#e4cba0',
          400: '#d3ab6d',
          500: '#c08f49',
          600: '#a3733a',
          700: '#835b31',
          800: '#6b4a2c',
          900: '#583e27',
          950: '#302014',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}