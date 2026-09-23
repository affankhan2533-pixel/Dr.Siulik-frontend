/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: '#006C73',
          primary: '#08A6A8',
          aqua: '#5ED7D5',
          soft: '#E8F8F8',
          textDark: '#082F35',
          textMuted: '#547174',
          gold: '#D4AF37',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(8, 166, 168, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(8, 166, 168, 0.16)',
        'teal-glow': '0 0 25px rgba(8, 166, 168, 0.25)',
        'soft': '0 4px 20px -2px rgba(8, 47, 53, 0.05)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};
