import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#c91900',
          black: '#000200',
          grey: '#717b70',
        },
      },
      animation: {
        'logo-spin': 'logoSpin 4s ease-in-out infinite',
      },
      keyframes: {
        logoSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '15%': { transform: 'rotate(15deg) scale(1.02)' },
          '30%': { transform: 'rotate(-10deg) scale(1)' },
          '45%': { transform: 'rotate(5deg) scale(1.01)' },
          '60%': { transform: 'rotate(0deg) scale(1)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
