/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif', 'ui-sans-serif', 'system-ui'],
        serif: ['Space Grotesk', 'sans-serif', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
