/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: '#0f172a',
        royal: '#1d4ed8',
        aurora: '#8b5cf6',
        mint: '#14b8a6',
        sand: '#f8fafc',
        ink: '#020617',
      },
      backgroundImage: {
        'aurora-radial':
          'radial-gradient(circle at top left, rgba(29, 78, 216, 0.24), transparent 28%), radial-gradient(circle at top right, rgba(139, 92, 246, 0.18), transparent 26%), linear-gradient(180deg, #020617 0%, #0f172a 60%, #111827 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.45s ease-out both',
      },
      screens: {
        xs: '420px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(15, 23, 42, 0.18)',
        soft: '0 10px 30px rgba(2, 6, 23, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};