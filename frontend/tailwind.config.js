/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // TLX Cohort 25 Agricultural Palette
        'forest': {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bae5ba',
          300: '#8dd48d',
          400: '#5cb85c',
          500: '#3d8b3d', // TLX Green
          600: '#2e6b2e',
          700: '#1e4d1e',
          800: '#0f2e0f',
          900: '#051405',
        },
        'terracotta': {
          50: '#fdf7f5',
          100: '#fbe9e4',
          200: '#f6d1c7',
          300: '#f0b5a5',
          400: '#e9957f',
          500: '#d27456', // TLX Red
          600: '#b45c44',
          700: '#904835',
          800: '#6d3828',
          900: '#4a2418',
        },
        'soil': {
          50: '#f8f5f2',
          100: '#efead9',
          200: '#e6d5b1',
          300: '#d4b896',
          400: '#bc9a6e',
          500: '#9b7e5a',
          600: '#7d6548',
          700: '#624d3a',
          800: '#4c3a2d',
          900: '#3a2c1f', // Deep Charcoal
        },
        'sunlight': {
          50: '#fefdf2',
          100: '#fefce8',
          200: '#fef8c8',
          300: '#fef29c',
          400: '#fde047',
          500: '#facc15',
          600: '#eab308',
          700: '#ca8a04',
          800: '#a16207',
          900: '#713f12',
        }
      },
      fontFamily: {
        'modern': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
