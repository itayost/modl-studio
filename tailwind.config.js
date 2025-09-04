/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#faf9f1',
        'gold': '#cca47f',
        'light-gold': '#ddbc9b',
        'light-cream': '#f5e9db',
        'brown': '#7d5a50',
        'red-accent': '#c6302c'
      },
      fontFamily: {
        'hebrew': ['Rubik', 'system-ui', 'sans-serif'],
        'handwritten': ['Caveat', 'cursive'],
        'typewriter': ['Courier New', 'monospace']
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
}