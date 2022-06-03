module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#4B6BFB",
      Primary_Light: "#8999ff",
      primary_Dark: "#0041c7",
      secondary: "#7B92B2",
      accent: "#67CBA0",
      neutral: "#181A2A",
      "base-100": "#FFFFFF",
      info: "#3ABFF8",
      success: "#36D399",
      warning: "#FBBD23",
      error: "#F87272",
      disableColor: '#E5E5E5'
    },
    extend: {
      boxShadow: {
        'cards': '0px 4px 25px 4px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        outfit: ["Outfit, Helvetica, Arial, Lucida, sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addVariant, e }) {
      addVariant('first-child', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`first-child${separator}${className}`)}:first-child`
        })
      })
    }
  ],
};
