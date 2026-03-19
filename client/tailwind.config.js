/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '88rem',
      },
      colors: {
        primary: {
          DEFAULT: '#004cb0',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#004cb0', // User requested primary
          700: '#003a8c', // Darker shade for hover
          800: '#1e40af',
          900: '#1e3a8a',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#004cb0', // Overriding blue-600 to match primary
          700: '#003a8c', // Overriding blue-700 for consistent hover
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        }
      },
    },
  },
  plugins: [],
}
