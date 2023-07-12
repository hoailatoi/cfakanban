module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['IBM Plex Sans Medium', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [],
};