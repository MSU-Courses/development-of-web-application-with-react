const { blue } = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#252525',
        secondary: '#666',
        screens: {
          sm: '768px',
        },
        link: blue[700],
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif', 'ui-sans-serif', 'system-ui'],
        serif: ['Space Grotesk', 'sans-serif', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
