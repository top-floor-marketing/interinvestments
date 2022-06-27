import { createSlice } from "@reduxjs/toolkit";

import { DEFAULT_ROUTE } from "../Route/routes";
import { LOCAL_STORAGE } from "../Utils/globalConstants";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoadingFull: true,
    route: DEFAULT_ROUTE,
    infoUser: null,
  },
  reducers: {
    toggleLoadingFull: (state, action) => {
      state.isLoadingFull = action.payload || false;
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
    setNavigation: (state, action) => {
      const routeName = action.payload;
      localStorage.setItem(LOCAL_STORAGE.ROUTE, routeName);
      state.route = routeName;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleLoadingFull, setRoute, setInfoUser, setNavigation, setFilter } =
  userSlice.actions;

export default userSlice.reducer;
