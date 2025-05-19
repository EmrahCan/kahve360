/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6A3B2B',
          light: '#8D5B4C',
          dark: '#4A2B1B',
        },
        secondary: {
          DEFAULT: '#D4A574',
          light: '#E8C9A9',
          dark: '#B28046',
        },
        accent: {
          DEFAULT: '#F9F5F0',
          dark: '#E8E4DF',
        },
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        background: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 15px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
