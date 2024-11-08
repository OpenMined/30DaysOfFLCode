const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./src/**/*.{jsx,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Rubik"', ...fontFamily.sans],
        mono: ['"Fira Code"', ...fontFamily.mono],
      },
      colors: {},
    },
  },
  plugins: [],
};
