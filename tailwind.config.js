/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // AI-Generated Brand Colors (Modernized Adidas/Abibas)
        primary: {
          50: '#f0f7ff',
          100: '#e0edff',
          200: '#c7deff',
          300: '#a4c8ff',
          400: '#77a7ff',
          500: '#4f7efc',
          600: '#2f5cf2',
          700: '#2347df',
          800: '#1e3db6',
          900: '#1e388e',
        },
        secondary: {
          50: '#fbfbfb',
          100: '#f7f7f7',
          200: '#ededed',
          300: '#e0e0e0',
          400: '#c2c2c2',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#404040',
          900: '#262626',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
