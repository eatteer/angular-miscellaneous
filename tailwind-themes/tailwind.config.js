const { createThemes } = require("tw-colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    createThemes(
      {
        light: {
          primary: {
            DEFAULT: "#877617",
          },
        },
        dark: {
          primary: {
            DEFAULT: "#fff1a4",
          },
        },
      },
      // Use the exact same theme name as the class name
      { getThemeClassName: (theme) => theme }
    ),
  ],
};
