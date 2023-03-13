import { configureStore } from "@reduxjs/toolkit";
// slices
import listingDataSlice, { setSelectedListing } from "./listingDataSlice";
import filterSlice, {
  setSearch,
  setneighborhood,
  setCategory,
} from "./filterSlice";
import statusQuerySlice, {
  setIsLoading,
  setcISError,
  setDataCategory,
  setDataNeighborhood,
  setDataMapApiKey,
  setDataListing,
  setEmptyData,
} from "./statusQuerysSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    statusQuery: statusQuerySlice,
    listing_data: listingDataSlice,
  },
});

const actionslices = {
  setSearch,
  setIsLoading,
  setcISError,
  setDataCategory,
  setDataNeighborhood,
  setneighborhood,
  setCategory,
  setDataMapApiKey,
  setDataListing,
  setEmptyData,
  setSelectedListing,
};

export { actionslices };
