/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        muted: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      textColor: {
        muted: {
          light: "#737373",
          dark: "#a3a3a3",
        },
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      fontFamily: {
        poppinsExtraLight: ["PoppinsExtraLight"],
        poppinsLight: ["PoppinsLight"],
        poppinsThin: ["PoppinsThin"],
        poppins: ["Poppins"],
        poppinsSemibold: ["PoppinsSemibold"],
        poppinsBold: ["PoppinsBold"],
        poppinsExtraBold: ["PoppinsExtraBold"],
        poppinsBlack: ["PoppinsBlack"],
      },
    },
  },
  plugins: [],
};
