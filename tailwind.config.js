import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "23px"],
      lg: ["18px", "24.5px"],
      xl: ["20px", "26px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
    extend: {
      fontFamily: {
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#360077",
        "primary-light": "#7246A7",
        "background": "#000000",
        "main": "#dedede",
        "muted": "#A6A6A6",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        hero: "url('assets/images/collection-background.svg')",
        card: "url('assets/images/thumbnail-background.svg')",
      },
      screens: {
        wide: "1440px",
      },
    },
  },
  plugins: [
      plugin(function({ addComponents, theme }) {
      addComponents({
        '.text-heading': {
          fontSize: theme('fontSize.lg'),
          '@screen md': {
            fontSize: theme('fontSize.2xl'),
          },
          '@screen lg': {
            fontSize: '32px',
            lineHeight: 1.2
          },
        }
      })
    })
  ],
};
