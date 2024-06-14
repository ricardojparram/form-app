/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primar: "#96bd0d",
          second: "#7d9c0b",
          third: "#386664",
          error: "#ba1a1a",
          background: "#fdfdf5",
        },
      },
    },
  },
  extend: {},
  plugins: [],
};
