import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-radial":
          "radial-gradient(circle at 100% 0, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)",
        "custom-linear":
          "linear-gradient(108.32deg, #62CDCB 24.88%, #4599DB 78.49%)",
      },
      boxShadow: {
        "custom-linear": "0 4px 20px rgba(98, 205, 203, 0.5)", // Fallback for the gradient effect
      },
      colors: {
        golden:
          "linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)",
        "custom-gradient":
          "linear-gradient(134.86deg, #ABFFFD 2.64%, #4599DB 102.4%, #AADAFF 102.4%)",
      },
    },
  },
  plugins: [],
};
export default config;
