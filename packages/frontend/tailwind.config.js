module.exports = {
  purge: ["./src/pages/*.tsx", "./src/components/**/*.tsx"],
  darkMode: false,
  theme: {},
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
