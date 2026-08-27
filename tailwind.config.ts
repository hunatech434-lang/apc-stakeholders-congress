import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2FBF6',
          100: '#E1F7EB',
          200: '#C2EED7',
          300: '#92E0B7',
          400: '#56CB8F',
          500: '#008751', // APC Official Primary Green
          600: '#007545',
          700: '#005D37', // Deep Green
          800: '#004A2D',
          900: '#003D25',
          950: '#002214',
        },
        gold: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8', // Official APC Light Blue
          500: '#00A3E0', // APC Official Light Sky Blue
          600: '#0284C7',
          700: '#0369A1',
        },
        sky: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#00A3E0', // APC Official Light Blue
          600: '#0284C7',
          700: '#0369A1',
        },
        apcBlue: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#00A3E0', // Official APC Light Sky Blue
          600: '#0284C7',
          700: '#0369A1',
        },
        apcRed: {
          50: '#FFF1F1',
          100: '#FFE1E1',
          200: '#FFC8C8',
          500: '#E52528', // Official APC Red
          600: '#D32F2F',
          700: '#B71C1C',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
