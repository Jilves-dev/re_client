/** @type {import('tailwindcss').Config} */
module.exports = {
   important: false,
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
          animation: {
        fadeIn: 'fadeIn 0.5s ease-in'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '90%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
      },
    },
    plugins: [],
  }