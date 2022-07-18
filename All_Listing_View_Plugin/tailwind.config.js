module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontWeight: {
      "wp-semibold": 400,
      "wp-bold": 500,
    },
    extend: {
      boxShadow: {
        "wp-normal": "0px 4px 25px 4px rgba(0, 0, 0, 0.05)",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
      fontFamily: {
        outfit: ["Outfit, Helvetica, Arial, Lucida, sans-serif"],
      },
    },
  },
  plugins: [],
};
