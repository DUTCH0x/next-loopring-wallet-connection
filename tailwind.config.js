/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', ...defaultTheme.fontFamily.sans],
        orbitron: ['Orbitron', ...defaultTheme.fontFamily.sans],
        spaceGrotesk: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary-orange': '#FF4800',
        'light-primary-orage': '#FF9F5B',
        'dark-surface': '#121212',
        'light-surface': '#F9FAFB',
        'dark-orange': '#FF5A19',
        'light-orange': '#FFA726',
        'dark-green': '#62BA52',
        'light-green': 'rgba(60, 170, 42, 0.2)',
        'dark-red': '#D13636',
        'light-red': 'rgba(209, 54, 54,0.2)',
        'dark-blue': '#5169A4',
        'light-dark-blue': '#90A4C3',
        'accent-green': '#3CAA2A',
        'light-accent-green': '#51C53B',
        'accent-red': '#C60707',
        'light-accent-red': '#EF5350',
        'accent-blue': '#2E7CF6',
        'light-blue': '#6495ED',
        'accent-gray': 'rgb(128, 128, 128)',
        'light-gray': 'rgba(128, 128, 128,0.2)',
        'success-default': '#70BC63',
        'danger-default': '#DF4141',
        'info-default': '#4798E3',
        'text-inactive': 'rgba(255,255,255,0.5)',
        'light-text-inactive': 'rgba(0,0,0,0.7)',
      },
      maxWidth: {
        wide: '1920px',
      },
      height: {
        5.5: '1.375rem',
        6.5: '1.625rem',
        9.5: '2.375rem',
      },
      lineHeight: {
        4.5: '1.125rem',
      },
      keyframes: {
        sideFilter: {
          '0%': { opacity: 0, width: 0, height: 0, padding: 0 },
          '50%': { width: 224, height: '100%', padding: 8 },
          '100%': { opacity: 1, width: 224, height: '100%', padding: 8 },
        },
        sideFilter2: {
          '0%': { opacity: 1, width: 224, height: '100%', padding: 8 },
          '50%': { opacity: 0 },
          '100%': { opacity: 0, width: 0, height: 0, padding: 0 },
        },
        loader: {
          '0%': { backgroundColor: 'hsl(0, 0%, 60%)' },
          '100%': { backgroundColor: 'hsl(0, 0%, 80%)' },
        },
      },
      animation: {
        sideFilterIn: 'sideFilter 0.3s ease-out forwards',
        sideFilterOut: 'sideFilter2 0.3s ease-out forwards',
        skeletonAni: 'loader 1s linear infinite alternate',
      },
    },
  },
  plugins: [],
};
