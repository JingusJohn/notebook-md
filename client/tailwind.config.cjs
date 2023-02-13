/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: [{
    pattern: /hljs+/,
  }],
  theme: {
    extend: {
      // fontFamily: {
      //   poppins: 
      // }
      hljs: {
        theme: 'agate',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-highlightjs')
  ],
}
