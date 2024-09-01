/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Almarai', 'Arial', 'sans-serif'],
      },
      colors: {
        ligth: {
          background: "#83C487",
          background_secondary: "#E2ECE3",
          container: "#336B48",
          selected: "#336B48",
          primary: "#FFFFFF",
          secondary:"#000000",
          tertiary: "#336B48",
          button: "#929292",
          orange: "#E18E19",
          red: "#A00A0A",
          blue: "#105E9D",
          dark_gray: "#6A6A6A",
          ligth_gray: "#DCD8D8"
        }
      }
    },
  },
  plugins: [],
}

