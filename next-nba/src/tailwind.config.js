module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'md': '640px',
        'lg': '960px'
      },
    },
  },
  plugins: [
    'tailwindcss',
    'postcss-preset-env',
  ],
}
