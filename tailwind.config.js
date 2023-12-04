/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'theme': {
          'primar' : "#386b01",
          'second' : "#57624a",
          'third' : "#386664",
          'error' : '#ba1a1a',
        },
      }
    },
  },
  extend: {},
  plugins: [],
}