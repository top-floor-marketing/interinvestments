import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedListing: null,
};

export const listingDataSlice = createSlice({
  name: "listing_data",
  initialState,
  reducers: {
    setSelectedListing: (state, action) => {
      state.selectedListing = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedListing } = listingDataSlice.actions;

export default listingDataSlice.reducer;
