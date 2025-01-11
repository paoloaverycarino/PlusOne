/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        neue: ['NeueMontreal', 'sans-serif'], // Custom font family name and fallback
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

