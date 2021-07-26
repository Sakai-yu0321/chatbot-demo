module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.{js,jsx,ts,tsx}', './public/index.html'
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    boxShadow: {
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.8)',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
