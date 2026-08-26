import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  theme: {
    extend: {
      colors: {
        primary: "#061A2B",
        secondary: "#0A2740",
        surface: "#103652",
        accent: "#ED1C24",
        light: "#F7F9FB",
        body: "#263B4B",
        success: "#0A2740"
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-be-vietnam)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(6, 26, 43, 0.10)",
        card: "0 12px 35px rgba(6, 26, 43, 0.07)"
      }
    }
  },
  plugins: []
};

export default config;
