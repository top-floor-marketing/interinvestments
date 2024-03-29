export const COLOR_SCHEME_DARK = "dark";
export const COLOR_SCHEME_LIGHT = "light";
// https://convertingcolors.com/hex-color-0C0C0C.html?search=Hex(0C0C0C)
// https://10015.io/tools/color-shades-generator

export const DEFAUL_STORE_THEME = {
    colorScheme: COLOR_SCHEME_DARK,
    fontFamily: "Outfit, Helvetica, Arial, Lucida, sans-serif",
    defaultRadius: "sm",
    white: "#fff",
    black: "#000",
    breakpoints: {
      xs: 250,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xl_2: 1536,
    },
    radius: {
      xs: "5px",
      sm: "10px",
      md: "15px",
      lg: "20px",
      xl: "25px",
      _30px: "30px",
      _40px: "40px"
    },
    shadows: {
      xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      
    },
    other: {
      spacing: {
        p1: "0.25rem",
        p2: "0.5rem",
        p3: "0.75rem",
        p4: "1rem",
        p5: "1.25rem",
        p6: "1.50rem",
        p7: "1.75rem",
        p8: "2rem",
        p9: "2.25rem",
        p10: "2.5rem",
        p11: "2.75rem",
        p12: "3rem",
      },
      shadow: {
        lgPrimary: "0 10px 15px -3px rgb(83 152 255 / 0.1), 0 4px 6px -4px rgb(83 152 255 / 0.1)"
      }
    },
    colors: {
      primary: [
        "#5398ff",
        "#5398ff",
        "#5398ff",
        "#5398ff",
        "#5398ff",
        "#3f8cff",
        "#2a80ff",
        "#1673ff",
        "#0167ff",
        "#005fec",
      ],
      info: [
        "#FFE0FF",
        "#FFE0FF",
        "#FFE0FF",
        "#FFE0FF",
        "#FFC4FF",
        "#F0A8FF",
        "#D38DEE",
        "#B773D2",
        "#9B59B6"
      ],
      secondary: [
        "#ffb839",
        "#ffb839",
        "#ffb839",
        "#ffb839",
        "#ffb839",
        "#ffb125",
        "#ffa910",
        "#fba100",
        "#e69400",
        "#d28700",
      ],
      error: [
        "#ff7272",
        "#ff7272",
        "#ff7272",
        "#ff7272",
        "#ff7272",
        "#ff5e5e",
        "#ff4949",
        "#ff3535",
        "#ff2020",
        "#ff0c0c",
      ],
      success: [
        "#0ee1a0",
        "#0ee1a0",
        "#0ee1a0",
        "#0ee1a0",
        "#0ee1a0",
        "#0dce92",
        "#0cbb85",
        "#0aa777",
        "#099469",
        "#08815c",
      ],
      white: ["#FFF", "#f3f3f2"],
      black: ["#000"],
      gray: [
        "#eaeae9",
        "#eaeae9",
        "#eaeae9",
        "#eaeae9",
        "#d6d6d4",
        "#ccccca",
        "#c2c2bf",
        "#b8b8b5",
        "#aeaeaa",
        "#a4a4a0",
      ],
      dark: [
        "#1b1b1b",
        "#191919",
        "#161616",
        "#141414",
        "#111111",
        "#0c0c0c",
        "#090909",
        "#070707",
        "#040404",
        "#020202",
      ],
    },
    primaryColor: "primary",
  }