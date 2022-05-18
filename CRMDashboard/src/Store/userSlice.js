import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "theme",
  initialState: {
    isLoadingFull: false,
  },
  reducers: {
    toggleLoading: (state) => {
      state.isLoadingFull = !state.isLoadingFull;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleLoading } = userSlice.actions;

export default userSlice.reducer;
