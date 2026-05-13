import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05070b",
        ember: "#d6a34a",
        signal: "#42d5d9",
        blood: "#8f2033",
        paper: "#d8c7a1",
        storm: "#17202f",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        signal: "0 0 48px rgba(66, 213, 217, 0.18)",
        ember: "0 0 40px rgba(214, 163, 74, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
