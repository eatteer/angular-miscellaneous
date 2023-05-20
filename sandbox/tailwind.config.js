const colors = {
  primary: "#F9D923",
  "primary-focus": "#DAC132",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      ...colors,
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          ...colors,
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
