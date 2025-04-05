/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          //'floral': ['"FloralCapsNouveau"', 'serif'],  
          // 'castoro-titling': ['"Castoro Titling"', 'serif'],
          'castoro': ['"Castoro"', 'serif'],
        },
      },
    },
    plugins: [],
  }