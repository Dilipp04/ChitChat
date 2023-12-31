/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray':'#4B5563',
        'rblue': '#8249fe',
        'lgray':'#f6f6f6',
        'lblue':'#e3edfa',
        "profile":"#cccccc"
      },
    },
  },
  plugins: [],
}