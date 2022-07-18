import { createSlice } from "@reduxjs/toolkit";

import { DEFAULT_ROUTE, ROUTES_NAMES } from "../Route/routes";
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
    setLogout: (state) => {

      localStorage.setItem(LOCAL_STORAGE.ROUTE, null);
      localStorage.setItem(LOCAL_STORAGE.TOKEN, null);
      localStorage.setItem(LOCAL_STORAGE.REFRESH, null);
      localStorage.setItem(LOCAL_STORAGE.USER, null);
      localStorage.setItem(LOCAL_STORAGE.LEAD_DETAIL_ID, null);

      state.infoUser = null;
      state.route = ROUTES_NAMES.AUTH;

    }
  },
});

// Action creators are generated for each case reducer function
export const { toggleLoadingFull, setRoute, setInfoUser, setNavigation, setFilter, setLogout } =
  userSlice.actions;

export default userSlice.reducer;
