import { configureStore } from "@reduxjs/toolkit";

// slice
import themeSlice from "./themeSlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
  },
});
