/** @type {import('tailwindcss').Config} */
import daisyui, { themes } from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tektur: ['"Tektur"', 'sans-serif'],
        raleway: ['"Raleway"', 'sans-serif']
      },
    },
  },
  plugins: [daisyui],
}