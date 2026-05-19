import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 25px 80px rgba(123, 67, 255, 0.18)',
        soft: '0 20px 60px rgba(15, 23, 42, 0.38)',
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at top center, rgba(139, 92, 246, 0.28), transparent 35%), radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.16), transparent 20%)',
        'card-glow': 'linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(139, 92, 246, 0.16)' },
          '50%': { boxShadow: '0 0 42px 14px rgba(139, 92, 246, 0.08)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
      colors: {
        surface: '#07090f',
        surface2: '#111827',
        surface3: '#141b2f',
        accent: '#8b5cf6',
        accent2: '#7c3aed',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
