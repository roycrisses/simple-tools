/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Minimalist grayscale palette
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e8e8e8',
          300: '#d1d1d1',
          400: '#b0b0b0',
          500: '#888888',
          600: '#666666',
          700: '#444444',
          800: '#2a2a2a',
          900: '#1a1a1a',
        },
        black: '#000000',
        white: '#ffffff',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'md': '4px',
        'lg': '4px',
        'xl': '4px',
      }
    },
  },
  plugins: [],
}
