/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ed',
          100: '#fdedd3',
          200: '#fbd7a5',
          300: '#f8bc6d',
          400: '#f59532',
          500: '#f37316',
          600: '#e4570c',
          700: '#bd420c',
          800: '#973512',
          900: '#7a2e12',
        },
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        beige: {
          50: '#fefdfb',
          100: '#fdf8f0',
          200: '#f9f0e1',
          300: '#f3e4c8',
          400: '#ebd4a8',
          500: '#e1c085',
          600: '#d4a574',
          700: '#c18a5a',
          800: '#a0714a',
          900: '#825d3d',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
