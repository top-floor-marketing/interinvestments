import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  neighborhood: "",
  category: "",
  idListingHover: null,
};

export const filterSlice = createSlice({
  name: "filters_vales",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setneighborhood: (state, action) => {
      state.neighborhood = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearch, setneighborhood, setCategory } = filterSlice.actions;

export default filterSlice.reducer;
