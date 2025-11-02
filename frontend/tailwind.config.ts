import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary & Secondary Palette
        'profound-blue': '#1E007E',
        'violet': '#7F00FF',
        'magenta': '#FF00FF',
        'blush-rose': '#F0E0E0',
        // High-Impact Accent Colors
        'electric-pink': '#FF0080',
        'neon-green': '#39FF14',
      },
      fontFamily: {
        'heading': ['Orbitron', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grid': "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-purple': 'linear-gradient(135deg, #1E007E 0%, #7F00FF 50%, #FF00FF 100%)',
        'gradient-pink': 'linear-gradient(135deg, #FF0080 0%, #FF00FF 100%)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        glow: {
          '0%': { 'text-shadow': '0 0 5px #7F00FF, 0 0 10px #7F00FF, 0 0 15px #FF00FF' },
          '100%': { 'text-shadow': '0 0 10px #FF0080, 0 0 20px #FF0080, 0 0 30px #FF00FF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config


