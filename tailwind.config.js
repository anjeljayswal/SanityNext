/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js}', // Keep this line
  './components/**/*.{ts,tsx,js}',
  './app/**/*.{ts,tsx,js}', // This one
  './pages/*.{ts,tsx,js}',],
  theme: {
    extend: {},
  },
  plugins: [],
}

