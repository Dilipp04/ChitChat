/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-mode="dark"]'],
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
        "profile":"#cccccc",
        "darkgray":"#1e1f23",
        "darklgray":"#2c2d31",
        "ink": {
          900: "#111827",
          950: "#070b14"
        },
        "brand": {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#2563eb",
          700: "#4f46e5"
        }
      },
    },
  },
  plugins: [],
}
