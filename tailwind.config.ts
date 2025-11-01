import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Primary accent colors
        accent: {
          DEFAULT: '#FFAB3D',
          hover: '#d97706'
        },
        // Background colors
        background: {
          primary: '#000000',
          secondary: '#1a1a1a',
          card: 'rgba(255, 255, 255, 0.05)'
        },
        // Text colors
        text: {
          primary: '#ffffff',
          secondary: '#6a6a6a'
        },
        // Border colors
        border: {
          DEFAULT: '#2a2a2a',
          light: 'rgba(255, 255, 255, 0.1)'
        }
      },
      fontFamily: {
        sans: ['InstrumentSans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      fontSize: {
        'hero': '2.6rem',
        'section': '2.5rem'
      },
      borderRadius: {
        'card': '10px',
        'modal': '16px',
        'modal-lg': '24px'
      },
      boxShadow: {
        'modal': '0 25px 80px rgba(0, 0, 0, 0.4)',
        'button': '0 4px 15px rgba(255, 171, 61, 0.3)',
        'button-hover': '0 8px 25px rgba(255, 171, 61, 0.4)'
      },
      backdropBlur: {
        'modal': '8px'
      },
      transitionDuration: {
        'standard': '300ms',
        'quick': '200ms'
      },
      maxWidth: {
        'container': '1200px'
      }
    }
  },
  plugins: []
}

