/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors: {
        ligth: {
          background: "#83C487",
          container: "#336B48",
          primary: "#FFFFFF",
          secondary:"#000000",
          tertiary: "#336B48",
        }
      }
    },
  },
  plugins: [],
}

