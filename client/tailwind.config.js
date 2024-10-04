/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Hammersmith One'],
        mono: ['DM Mono'],
      },
      colors: {
        primary: {
          DEFAULT: '#ecffb2',
          light: '#e6ff99', 
          dark: '#1E40AF',  
        },
        secondary: {
          DEFAULT: '#9333EA',
          light: '#A855F7', 
          dark: '#7E22CE',
        },
        accent: {
          DEFAULT: '#F59E0B', 
          light: '#FBBF24', 
          dark: '#D97706',  
        },
        neutral: {
          100: '#F3F4F6', 
          200: '#E5E7EB',    
          300: '#D1D5DB',    
        },
      },
    },
  },
  plugins: [],
}