import { SET_ALL_CATEGORIES, SET_ACTIVE_CATEGORY } from "../actionStore";

const useCategories = (dispatch) => {

    const setCategories = (payload) => {
        dispatch({
            type: SET_ALL_CATEGORIES,
            payload: payload
        })
    }

    const setActiveCategory = (payload) => {
        dispatch({
            type: SET_ACTIVE_CATEGORY,
            payload: payload
        })
    }

    return {
        setCategories,
        setActiveCategory
    }
}

export default useCategories;