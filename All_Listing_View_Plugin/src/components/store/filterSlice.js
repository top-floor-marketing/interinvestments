import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: '',
    neighborhood: '',
    categoy: ''
}

export const filterSlice = createSlice({
    name: 'filters_vales',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setneighborhood: (state, action) => {
            state.neighborhood = action.payload
        },
        setcategoy: (state, action) => {
            state.categoy = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setSearch, setneighborhood, setcategoy } = filterSlice.actions

export default filterSlice.reducer