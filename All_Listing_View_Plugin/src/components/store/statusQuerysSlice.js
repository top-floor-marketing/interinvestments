import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: true,
    isListingError: false,
    isError: false,
    mapApiKey: '',
    dataCategory: [],
    dataNei: [],
    dataListing: [],
    pageInfoListing: {}
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
            const { data } = action.payload
            state.dataListing = [...data.nodes, ...state.dataListing];
            if (data.pageInfo?.endCursor) {
                state.pageInfoListing = data.pageInfo;
            }
        },
        setEmptyData: (state) => {
            state.dataListing = [];
            state.pageInfoListing = {};
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
    setDataListing,
    setEmptyData
} = filterSlice.actions

export default filterSlice.reducer