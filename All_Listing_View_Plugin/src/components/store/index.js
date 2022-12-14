import { configureStore } from '@reduxjs/toolkit'
// slices
import filterSlice, { setSearch, setneighborhood, setCategory } from './filterSlice'
import statusQuerySlice, {
    setIsLoading,
    setcISError,
    setDataCategory,
    setDataNeighborhood,
    setDataMapApiKey,
    setDataListing,
    setEmptyData
} from './statusQuerysSlice'

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        statusQuery: statusQuerySlice
    },
})

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
    setEmptyData
}

export { actionslices }