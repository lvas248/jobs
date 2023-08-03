/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glideInRight: {
          '0%': { transform: 'translateX(100%)'},
          '100%': { transform: 'translateX(0)'},
        },
        glideInLeft: {
          '0%': { transform: 'translateX(-400%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        glideInTop: {
          '0%': { transform: 'translateY(-100%)'},
          '100%': { transform: 'translateX(0)'},
        },      
        glideInBottom: {
          '0%': { transform: 'translateY(500%)'},
          '100%': { transform: 'translateX(0)'},
        },
        glideOutRight: {
          '0%': { transform: 'translateX(0)'},
          '100%': { transform: 'translateX(400%)'},
        },
      },
      animation: {
        'glide-in-right': 'glideInRight 500ms ease-out',
        'glide-in-left': 'glideInLeft 01s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
        'glide-in-top': 'glideInTop 01s ease-out',
        'glide-in-bottom': 'glideInBottom 01s ease-out',
        'glide-out-right': 'glideOutRight 01s ease-out',

  
      },
    },  },
  plugins: [],
}
