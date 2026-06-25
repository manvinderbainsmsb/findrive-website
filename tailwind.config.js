/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1565d8',
          green: '#3aab4a',
          dark: '#0f1b2d',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #1565d8 0%, #1f8fae 50%, #3aab4a 100%)',
      },
    },
  },
  plugins: [],
}
