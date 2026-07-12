/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Enterprise Navy Primary */
        primary: {
          DEFAULT: '#1E3A5F',
          hover: '#162D4A',
          light: '#EFF6FF',
          dark: '#162D4A',
        },
        /* Sky Blue CTA Accent */
        accent: {
          DEFAULT: '#0369A1',
          hover: '#0284C7',
          light: '#F0F9FF',
        },
        /* Semantic status */
        success: {
          DEFAULT: '#059669',
          light: '#ECFDF5',
        },
        warning: {
          DEFAULT: '#D97706',
          light: '#FFFBEB',
        },
        danger: {
          DEFAULT: '#DC2626',
          light: '#FEF2F2',
        },
        /* Neutral surfaces */
        neutral: {
          light: '#F8FAFC',
          border: '#E2E8F0',
          textMuted: '#64748B',
          textMain: '#0F172A',
          muted: '#E8ECF1',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        headings: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
        xs: ['11px', { lineHeight: '16px' }],
        sm: ['13px', { lineHeight: '20px' }],
        base: ['14px', { lineHeight: '22px' }],
      },
      boxShadow: {
        /* Soft UI Evolution elevation system */
        'soft-sm':  '0 1px 2px 0 rgba(15, 23, 42, 0.06), 0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'soft-md':  '0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'soft-lg':  '0 10px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
        'soft-xl':  '0 20px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'inset-sm': 'inset 0 1px 2px rgba(15, 23, 42, 0.05)',
      },
      borderRadius: {
        DEFAULT: '8px',
        'sm': '6px',
        'md': '8px',
        'lg': '10px',   /* cards */
        'xl': '12px',   /* modals, panels */
        '2xl': '16px',  /* large containers */
      },
      spacing: {
        /* Dashboard-density spacing scale */
        '4.5': '18px',
        '13': '52px',
        '15': '60px',
        '18': '72px',
      },
      transitionDuration: {
        DEFAULT: '150ms',
        '250': '250ms',
      },
    },
  },
  plugins: [],
}
