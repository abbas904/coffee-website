/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        petBg: '#FFF8F0',
        petPrimary: '#FF6B6B',
        petSecondary: '#FFB347',
        petText: '#2E2E2E',
        petTextLight: '#555555',
        petInputBg: '#FFFFFF',
        petInputText: '#333333',
        petPlaceholder: '#AAAAAA',
        petCardBg: '#FFF0E0',
        customRed: '#FF6B6B',
        lightCoffee: '#D8BFAA'
      },
      keyframes: {
        slideUpLeft: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUpRight: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%,70%': { transform: 'translateY(0)' },
          '70%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%,70%': { transform: 'translateY(0)' },
          '70%': { transform: 'translateY(-5px)' },
        },
        'fade-slide': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up-left': 'slideUpLeft 1.7s ease-out forwards',
        'slide-up-right': 'slideUpRight 1.7s ease-out forwards',
        'floating': 'float 4s ease-in-out infinite',
        'floating-delay': 'float 4s ease-in-out infinite 0.5s',
        'floating-slow': 'float-slow 4s ease-in-out infinite 0.2s',
        'fade-slide': 'fade-slide 0.8s ease-out forwards',
      },
      transitionDelay: {
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
    },
  },
  plugins: [],
}
