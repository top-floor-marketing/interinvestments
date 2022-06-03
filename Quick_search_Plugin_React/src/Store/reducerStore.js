import * as actionName from './actionStore'

import initialState from './initalState'

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionName.SET_SEARCH_LISTING: return {
            ...state,
            searchListing: action.payload
        }
        case actionName.SET_ALL_CATEGORIES: return {
            ...state,
            listCategories: action.payload
        }

        case actionName.SET_ACTIVE_CATEGORY: return {
            ...state,
            activeCategory: action.payload
        }

        case actionName.SET_FOCUS_INPUT: return {
            ...state,
            focusInput: action.payload
        }

        case actionName.SET_FOCUS_CARD: return {
            ...state,
            focusCard: action.payload
        }

        case actionName.SET_FOCUS_Menu: return {
            ...state,
            focusMenu: action.payload
        }

        case actionName.SET_LIST_NEIGHBORHOODS: return {
            ...state,
            listNeighborhoods: action.payload
        }

        case actionName.SET_ACTIVE_NEIGHBORHOODS: return {
            ...state,
            activeNeighborhoods: action.payload
        }

        default: return { ...state }
    }
}

export default reducer