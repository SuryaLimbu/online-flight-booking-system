import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              // DEFAULT: "#04125c",
              DEFAULT: "#1941BA",
              
              foreground: "#000000",
            },
            secondary: {
              // DEFAULT: "#1941BA",
              DEFAULT: "#04125c",
              foreground: "#000000",
            },
            focus: "#BEF264",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#0d9488",
              foreground: "#000000",
            },
            focus: "#BEF264",
            danger: "#e11d48",
          },
        },
      },
    }),
  ],
};