import * as actionName from './actionStore'

import initialState from './initalState'

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionName.SET_SEARCH_ACTIVE: return {
            ...state,
            searchActive: action.payload
        }
        case actionName.SET_ALL_CATEGORIES: return {
            ...state,
            listCategories: action.payload
        }

        case actionName.SET_ACTIVE_CATEGORY: return {
            ...state,
            activeCategory: action.payload
        }

        default: return { ...state }
    }
}

export default reducer