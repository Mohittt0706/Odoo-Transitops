/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#EFF6FF',
        },
        accent: {
          DEFAULT: '#111827',
          hover: '#1F2937',
          light: '#F3F4F6',
        },
        success: {
          DEFAULT: '#22C55E',
          light: '#DCFCE7',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
        },
        danger: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
        },
        neutral: {
          light: '#F8FAFC',
          border: '#E5E7EB',
          textMuted: '#6B7280',
          textMain: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        headings: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'soft-md': '0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
        'soft-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.04), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      }
    },
  },
  plugins: [],
}
