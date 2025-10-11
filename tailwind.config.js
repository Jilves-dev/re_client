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
          animation: {
        fadeIn: 'fadeIn 0.4s ease-in'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '80%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
      },
    },
    plugins: [],
  }