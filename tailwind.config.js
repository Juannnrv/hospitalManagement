/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx,vue,css}",
  ],
  theme: {
    extend: {
      colors: {
        "color-1": "#285430",
        "color-2": "#5F8D4E",
        "color-3": "#F4FFF3",
        "color-4": "#FFFFFF",
        "color-5": "#464E5F",
        "color-6": "#C9C9C9",
        "color-7": "#FAFAFA",
        "color-8": "#181C32"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

