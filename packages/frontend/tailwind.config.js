const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/pages/*.tsx", "./src/components/**/*.tsx"],
  darkMode: false,
  theme: {
    extend: {},
    fontFamily: {
      body: ["Robot", ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
