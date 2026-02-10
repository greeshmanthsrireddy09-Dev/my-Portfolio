/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],     // default body font
        display: ["Playwrite NZ Basic", "serif"],       // decorative headings
      },
    },
  },
  plugins: [],
};



