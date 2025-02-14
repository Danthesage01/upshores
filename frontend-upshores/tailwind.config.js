import createThemes from "tailwindcss-themer";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        secondary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        tertiary: {
          50: "#f9fafb",
          100: "#f3f4f6",
          2000: "#e5e7eb",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        highlight: {
          DEFAULT: "rgba(63, 32, 251, 0.1)",
          border: "#3f20fb",
        },
      },
      outline: {
        highlight: "2px solid #3f20fb",
      },
      zIndex: {
        1000: 1000,
      },
    },
  },
  plugins: [
    forms,
    typography,
    createThemes({
      light: {},
      dark: {
        primary: "#60a5fa",
        base: "#1f2937",
      },
    }),
  ],
};

export default config;
