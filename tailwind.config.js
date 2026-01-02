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
          ebba: ['EbbaNarrow', 'serif'],
          ebbaBold: ['EbbaNarrow-Bold', 'serif'],
          ebbaBoldItalic: ['EbbaNarrow-BoldItalic', 'serif'],
          ebbaItalic: ['EbbaNarrow-Italic', 'serif'],
          ebbaLight: ['EbbaNarrow-Light', 'serif'],
          ebbaLightItalic: ['EbbaNarrow-LightItalic', 'serif'],
          ebbaMedium: ['EbbaNarrow-Medium', 'serif'],
          ebbaMediumItalic: ['EbbaNarrow-MediumItalic', 'serif'],
          ebbaRegular: ['EbbaNarrow-Regular', 'serif'],
          artNouveauCaps: ['ArtNouveauCaps', 'serif'],
          attic: ['Attic', 'serif'],
          viaodalLibre: ['ViaodaLibre-Regular', 'serif'],
          pinoyonScript: ['PinoyonScript-Regular', 'serif'],
          lavishlyYours: ['LavishlyYours-Regular', 'serif'],
          imperialScript: ['ImperialScript-Regular', 'serif'],
          baskervville: ['Baskervville', 'serif'],
          baskervvilleItalic: ['Baskervville-Italic', 'serif'],
          ardeco: ['Ardeco', 'serif'],
          adineKirnberg: ['AdineKirnberg-Regular', 'serif'],
          dyerArts: ['Dyer Arts and Crafts', 'serif'],
          poiretOne: ['PoiretOne-Regular', 'serif'],
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