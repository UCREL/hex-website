module.exports = {
    content: ["./src/*.{html,njk,js}", "./src/**/*.{html,njk,js}"],
    theme: {
      extend: {},
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/typography')
    ],
    daisyui: {
        themes: [ "light", "dim", "dark", "nord" ]
    }
  }