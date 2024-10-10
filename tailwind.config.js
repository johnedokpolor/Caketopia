/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // screens: {
    //   sm: "480px",
    //   md: "768px",
    //   lg: "976px",
    //   xl: "1440px",
    // },
    extend: {
      colors: {
        bar: "#f0f4f9",
        primaryDark: "#bb2c51",
        secondary: "#21d4b9",
        dark: "#303030",
      },
      fontFamily: {
        inter: ["inter", "sans-serif"],
        cursive: ["Cedarville Cursive"],
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
