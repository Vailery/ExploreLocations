import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bodyBg: "#F8F8F8",
        redText: "#EE4848",
        redBg: "#EC3343",
        grayColor: "#959595",
        grayBg: "#F2F2F2",
        grayText: "#BCBCBC",
        buttonBg: "#4B9EFF",
        blackTransparent: "#0B0B0B99",
        darkGrayBg: "#232323",
      },
      backgroundImage: {
        gradientLeft:
          "linear-gradient(125deg, #FB6641 0%, #F62F32 10%,#953F9F 100%)",
        gradientRight:
          "linear-gradient(225deg, #EA3141 0%, #EA3347 10%, #CB325E 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
