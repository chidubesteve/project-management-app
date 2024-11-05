import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // green - #13802A
        green: {
          200: "#63e6be",
          300: "#44d7b6",
          400: "#2ea994",
          500: "#13802A",
          600: "#0f755f",
          700: "#0b6953",
          800: "#05613a",
          900: "#045a32",
        },
        "dark-bg": "#101214",
        "dark-secondary": "#1d1f22",
        "dark-tertiary": "#282a2e",
        "green-primary": "#0f755f",
        "stroke-dark": "#1d1f22", //#2d3135
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
