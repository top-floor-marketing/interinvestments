import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: true,
    isListingError: false,
    isError: false,
    mapApiKey: '',
    dataCategory: [],
    dataNei: [],
    dataListing: {}
}

export const filterSlice = createSlice({
    name: 'status_query',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setcISError: (state, action) => {
            state.isError = action.payload
        },
        setDataCategory: (state, action) => {
            state.dataCategory = action.payload
        },
        setDataNeighborhood: (state, action) => {
            state.dataNei = action.payload
        },
        setDataMapApiKey: (state, action) => {
            state.mapApiKey = action.payload
        },
        setDataListing: (state, action) => {
            state.dataListing = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setIsLoading,
    setcISError,
    setDataCategory,
    setDataNeighborhood,
    setDataMapApiKey,
    setDataListing
} = filterSlice.actions

export default filterSlice.reducer