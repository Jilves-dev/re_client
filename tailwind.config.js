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
          floral: ['FloralCapsNouveau', 'serif'],  
          castoro: ['Castoro-Regular', 'serif'],
          teutonic: ['Teutonic', 'serif'],
          monopol: ['Monopol', 'serif'],
          nouveauNostalgia: ['Nouveau Nostalgia', 'serif'],
          catchilds: ['Catchilds', 'serif'],
          decomang: ['DecomangHold-Regular', 'serif'],
          floralCapitals: ['FloralCapitals', 'serif'],
          flower: ['Flower Bloom Line Monogram', 'serif'],
          gorgeous: ['Gorgeous Floral Monogram', 'serif'],
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