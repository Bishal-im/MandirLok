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
        // Mandirlok Brand Colors
        saffron: {
          50:  '#fff8f0',
          100: '#ffeed6',
          200: '#ffd9a8',
          300: '#ffbd6e',
          400: '#ff9b30',
          500: '#ff7f0a',
          600: '#f06300',
          700: '#c74900',
          800: '#9f3a00',
          900: '#813200',
          950: '#461600',
        },
        maroon: {
          50:  '#fff0f0',
          100: '#ffdfdf',
          200: '#ffc5c5',
          300: '#ff9d9d',
          400: '#ff6464',
          500: '#ff2b2b',
          600: '#ed0000',
          700: '#c80000',
          800: '#8b0000',
          900: '#7b0000',
          950: '#430000',
        },
        gold: {
          50:  '#fffdf0',
          100: '#fffacc',
          200: '#fff385',
          300: '#ffe640',
          400: '#ffd60a',
          500: '#f0bc00',
          600: '#cc9200',
          700: '#a36900',
          800: '#875300',
          900: '#714400',
          950: '#422500',
        },
        temple: {
          bg:     '#fdf6ee',
          card:   '#ffffff',
          border: '#f0dcc8',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        devanagari: ['var(--font-devanagari)', 'serif'],
      },
      backgroundImage: {
        'temple-pattern':    "url('/images/temple-pattern.svg')",
        'mandala-pattern':   "url('/images/mandala-pattern.svg')",
        'saffron-gradient':  'linear-gradient(135deg, #ff7f0a 0%, #ff9b30 50%, #ffd60a 100%)',
        'divine-gradient':   'linear-gradient(135deg, #8b0000 0%, #c74900 50%, #ff7f0a 100%)',
        'hero-gradient':     'linear-gradient(180deg, rgba(255,127,10,0.05) 0%, rgba(255,255,255,1) 100%)',
      },
      animation: {
        'float':          'float 3s ease-in-out infinite',
        'glow':           'glow 2s ease-in-out infinite alternate',
        'shimmer':        'shimmer 2s linear infinite',
        'slide-up':       'slideUp 0.5s ease-out',
        'fade-in':        'fadeIn 0.6s ease-out',
        'spin-slow':      'spin 8s linear infinite',
        'lamp-flicker':   'lampFlicker 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        glow: {
          from: { boxShadow: '0 0 5px rgba(255,127,10,0.3)' },
          to:   { boxShadow: '0 0 20px rgba(255,127,10,0.6), 0 0 40px rgba(255,127,10,0.2)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        lampFlicker: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.7' },
          '75%':      { opacity: '0.9' },
        },
      },
      boxShadow: {
        'divine': '0 4px 30px rgba(255,127,10,0.15)',
        'card':   '0 2px 20px rgba(0,0,0,0.06)',
        'temple': '0 8px 40px rgba(139,0,0,0.12)',
      },
      borderRadius: {
        'divine': '1.5rem',
      },
    },
  },
  plugins: [],
}
export default config
