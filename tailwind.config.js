/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          950: '#0A0A0F',
          900: '#12121A',
          800: '#1C1C28',
          700: '#26263A',
          600: '#32324C',
          500: '#44445E',
        },
        neon: {
          400: '#7EF9C0',
          500: '#4DFFA8',
          600: '#00E87A',
        },
        crimson: {
          400: '#FF6B8A',
          500: '#FF3D6B',
        },
        slate: {
          400: '#94A3B8',
          300: '#CBD5E1',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(78, 255, 168, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(78, 255, 168, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
