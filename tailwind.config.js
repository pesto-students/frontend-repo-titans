/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wwbg: '#212121',
        wwtext: '#F5F7F8',
      }
    },
  },
  plugins: [],
}