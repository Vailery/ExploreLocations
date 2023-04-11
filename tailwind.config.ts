import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bodyBg: "#F8F8F8",
        redText: "#EE4848",
        greyColor: "#959595",
        buttonBg: "#4B9EFF",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(125deg, #FB6641 0%, #F62F32 10%,#953F9F 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
