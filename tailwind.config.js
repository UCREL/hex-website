module.exports = {
    content: [
      "./src/*.{html,njk,js}",
      "./src/**/*.{html,njk,md,js}",
      "./dist/*.{html,js}",
      "./dist/**/*.{html,md,js}"
    ],
    plugins: [
      require('daisyui'),
      require('@tailwindcss/typography')
    ],
    daisyui: {
      themes: ["light", "dark"], // "light" must be present
    },
    darkMode: "class"
  }