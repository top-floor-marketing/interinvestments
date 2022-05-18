import { createSlice } from "@reduxjs/toolkit";

const COLOR_SCHEME_DARK = "dark";
const COLOR_SCHEME_LIGHT = "light";
// https://convertingcolors.com/hex-color-0C0C0C.html?search=Hex(0C0C0C)
export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    colorScheme: COLOR_SCHEME_LIGHT,
    primaryColor: "primary",
    defaultRadius: "10",
    colors: {
      primary: [
        "#CCE0FF",
        "#99C2FF",
        "#5398FF",
        "#3385FF",
        "#0066FF",
        "#0052CC",
        "#003D99",
        "#002966",
        "#001433",
      ],
      secondary: [
        "#FFEDCC",
        "#FFDA99",
        "#FFC866",
        "#FFB839",
        "#FFA400",
        "#CC8300",
        "#996200",
        "#664100",
        "#332100",
      ],
      error: [
        "#FFCCCC",
        "#FF9999",
        "#FF7272",
        "#FF3333",
        "#FF0000",
        "#CC0000",
        "#990000",
        "#660000",
        "#330000",
      ],
      success: [
        "#CFFCEE",
        "#9FF9DD",
        "#6FF6CC",
        "#3FF3BC",
        "#0EE1A0",
        "#0CC089",
        "#099066",
        "#066044",
        "#033022",
      ],
      white: ["#FFF"],
      gray: [
        "#E6E6E5",
        "#D6D6D4",
        "#B4B4B1",
        "#9B9B97",
        "#83837C",
        "#686864",
        "#4E4E4B",
        "#343432",
        "#1A1A19",
      ],
      dark: [
        "#E6E6E6",
        "#CCCCCC",
        "#B3B3B3",
        "#999999",
        "#808080",
        "#666666",
        "#4D4D4D",
        "#333333",
        "#1A1A1A",
      ],
    },
  },
  reducers: {
    toggleColorScheme: (state) => {
      state.colorScheme =
        state.colorScheme === COLOR_SCHEME_LIGHT
          ? COLOR_SCHEME_DARK
          : COLOR_SCHEME_LIGHT;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleColorScheme } = themeSlice.actions;

export default themeSlice.reducer;
