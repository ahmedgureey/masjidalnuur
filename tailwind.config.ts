import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0B1F3A", light: "#1C3557" },
        amber: { accent: "#FFBF24" },
      },
    },
  },
  plugins: [],
};
export default config;
