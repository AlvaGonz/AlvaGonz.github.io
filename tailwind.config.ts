import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Axiforma', 'system-ui', 'sans-serif'],
        axiforma: ['Axiforma', 'sans-serif'],
      },
      colors: {
        // Semantic Theme Colors (Use these for shared components)
        theme: {
          background: 'var(--theme-background)',
          surface: 'var(--theme-surface)',
          primary: 'var(--theme-primary)',
          secondary: 'var(--theme-secondary)',
          accent: 'var(--theme-accent)',
          text: {
            DEFAULT: 'var(--theme-text)',
            secondary: 'var(--theme-text-secondary)',
          },
          border: 'var(--theme-border)',
        },

        // Curiosity Specific Colors (Palette 2)
        curiosity: {
          bg: 'var(--c-curiosity-bg)',
          primary: 'var(--c-curiosity-primary)',
          secondary: 'var(--c-curiosity-secondary)',
          accent: 'var(--c-curiosity-accent)',
          highlight: 'var(--c-curiosity-highlight)',
          text: 'var(--c-curiosity-text)',
          'text-secondary': 'var(--c-curiosity-text-secondary)',
        },

        // Legacy Formal Colors (Palette 1) - Kept for backward compatibility
        primary: {
          'rich-black': 'var(--c-primary-rich-black)',
          'dark-green': 'var(--c-primary-dark-green)',
          'bangladesh-green': 'var(--c-primary-bangladesh-green)',
          'mountain-meadow': 'var(--c-primary-mountain-meadow)',
          'caribbean-green': 'var(--c-primary-caribbean-green)',
          'anti-flash-white': 'var(--c-primary-anti-flash-white)',
        },
        secondary: {
          pine: 'var(--c-secondary-pine)',
          basil: 'var(--c-secondary-basil)',
          forest: 'var(--c-secondary-forest)',
          frog: 'var(--c-secondary-frog)',
          mint: 'var(--c-secondary-mint)',
          stone: 'var(--c-secondary-stone)',
          pistachio: 'var(--c-secondary-pistachio)',
        },
        gradient: {
          1: {
            from: 'var(--c-gradient-1-from)',
            to: 'var(--c-gradient-1-to)',
          },
          2: {
            from: 'var(--c-gradient-2-from)',
            to: 'var(--c-gradient-2-to)',
          },
          3: {
            from: 'var(--c-gradient-3-from)',
            to: 'var(--c-gradient-3-to)',
          },
          4: {
            from: 'var(--c-gradient-4-from)',
            to: 'var(--c-gradient-4-to)',
          },
          5: {
            from: 'var(--c-gradient-5-from)',
            to: 'var(--c-gradient-5-to)',
          },
        },
      },
      borderRadius: {
        'scroll-modern': 'var(--border-radius-modern, 0.5rem)',
      },
      boxShadow: {
        'scroll-modern': 'var(--shadow-modern, 0 4px 6px -1px rgb(0 0 0 / 0.1))',
      },
      blur: {
        'scroll-modern': 'var(--blur-modern, 0px)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse-slow': 'spin-reverse 10s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
