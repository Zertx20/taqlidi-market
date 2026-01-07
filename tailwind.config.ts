import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'Almarai', 'sans-serif'],
        'arabic-elegant': ['Amiri', 'Cairo', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;