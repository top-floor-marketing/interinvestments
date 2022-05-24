import { createSlice } from "@reduxjs/toolkit";

import { DEFAULT_ROUTE } from "../Route/routes";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoadingFull: false,
    route: DEFAULT_ROUTE,
    infoUser: null,
  },
  reducers: {
    toggleLoadingFull: (state, action) => {
      state.isLoadingFull = action.payload || !state.isLoadingFull;
    },
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    setInfoUser: (state, action) => {
      state.infoUser = {
        ...state.infoUser,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleLoadingFull, setRoute, setInfoUser } = userSlice.actions;

export default userSlice.reducer;
