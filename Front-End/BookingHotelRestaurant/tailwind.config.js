/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#004225",
        secondary: "#007E47",
        danger : "#C5270E",
        warning: "#E9C400",
        success: "#3818D9",
        senconBlue:"#006FD5",
        seconGray: "#C5C5C5",
        textGray: "#5F5F5F",
      },
      fontFamily: {
        architectsDaughter: ['Architects Daughter', 'cursive'],
      }
    },
  },
  plugins: [],
}

