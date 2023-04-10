import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        whiteBg: "#f5f5f5",
        redText: "#EE4848",
      },
    },
  },
  plugins: [],
} satisfies Config;
