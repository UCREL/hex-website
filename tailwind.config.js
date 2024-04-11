module.exports = {
    content: [
      "./src/*.{html,njk,js}",
      "./src/**/*.{html,njk,md,js}",
      "./dist/*.{html,js}",
      "./dist/**/*.{html,md,js}"
    ],
    theme: {
      extend: {},
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/typography')
    ],
    daisyui: {
        themes: [ "acid", "dim" ]
    }
  }