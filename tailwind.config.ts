import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // MUST Brand Colors
        must: {
          green: {
            DEFAULT: '#00D666',
            dark: '#03c25c',
            darker: '#009944',
            light: '#33E088',
            lighter: '#B3F5CC',
          },
          gold: {
            DEFAULT: '#f0b41c',
            dark: '#d99e0a',
            light: '#f2c547',
          },
          teal: {
            DEFAULT: '#00A855',
            dark: '#008844',
            light: '#33BB77',
          },
          blue: {
            DEFAULT: '#1a3a6e',
            dark: '#142d5a',
            light: '#2d4a7a',
          },
        },
        // Semantic Colors
        background: {
          card: 'var(--background-card)',
          section: 'var(--background-section)',
        },
        foreground: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['2.75rem', { lineHeight: '1.2' }],
        '6xl': ['3.25rem', { lineHeight: '1.2' }],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'strong': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'green': '0 15px 30px rgba(0, 214, 102, 0.3)',
        'gold': '0 15px 30px rgba(240, 180, 28, 0.3)',
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(135deg, #00D666 0%, #00A855 100%)',
        'gradient-gold': 'linear-gradient(135deg, #f0b41c 0%, #f2c547 100%)',
        'gradient-teal': 'linear-gradient(135deg, #00A855 0%, #33BB77 100%)',
        'gradient-hero': 'linear-gradient(135deg, #00D666 0%, #00A855 50%, #f0b41c 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'slide-in-right': 'slideInRight 0.4s ease forwards',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}

export default config