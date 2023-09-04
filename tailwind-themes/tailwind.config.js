const createThemes = require("tailwindcss-themer");

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({
      themes: [
        {
          name: "light",
          extend: {
            colors: {
              primary: {
                DEFAULT: "#877617",
                500: "#877617",
              },
            },
          },
        },
        {
          name: "dark",
          extend: {
            colors: {
              primary: {
                DEFAULT: "#fff1a4",
                500: "#fff1a4",
              },
            },
          },
        },
      ],
    }),
  ],
};
