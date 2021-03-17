module.exports = {
  purge: ["./src/pages/*.tsx", "./src/components/**/*.tsx"],
  darkMode: false,
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
