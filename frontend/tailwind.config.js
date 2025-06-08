export default {
  // Paths to all template files for purging unused styles
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Custom color palettes
      colors: {
        dark: {
          900: '#121212',
          800: '#1a1a1a',
          700: '#232323',
          600: '#2c2c2c',
          500: '#343434',
          400: '#3e3e3e',
        },
        glass: {
          900: 'rgba(10, 10, 10, 0.9)',
          800: 'rgba(18, 18, 18, 0.8)',
          700: 'rgba(26, 26, 26, 0.7)',
          600: 'rgba(34, 34, 34, 0.6)',
          500: 'rgba(42, 42, 42, 0.5)',
          400: 'rgba(50, 50, 50, 0.4)',
          300: 'rgba(60, 60, 60, 0.3)',
          200: 'rgba(70, 70, 70, 0.2)',
          100: 'rgba(80, 80, 80, 0.1)',
        },
      },
      // Custom background gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      // Custom box shadow utilities for glass effect
      boxShadow: {
        glass: '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 10px 30px 0 rgba(0, 0, 0, 0.2)',
      },
      // Additional backdrop blur utility size
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [], // No plugins used currently
};
