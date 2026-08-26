import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  theme: {
    extend: {
      colors: {
        primary: "#082E4B",
        secondary: "#124E73",
        accent: "#D51F2A",
        light: "#F8FAFC",
        body: "#334155",
        success: "#10B981"
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-be-vietnam)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(8, 46, 75, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
