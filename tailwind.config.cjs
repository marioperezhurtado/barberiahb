/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'hb-dark': '#1e1e1c',
        'hb-light': '#f6f6f6'
      },
      fontFamily: {
        display: ['Stint Ultra Expanded', 'display'],
        body: ['Pontano Sans', 'body']
      }
    }
  },
  plugins: []
}
