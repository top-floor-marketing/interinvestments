import { SET_SEARCH_LISTING, SET_FOCUS_INPUT } from "../actionStore";

const useCategories = (dispatch) => {

    const setSearchListing = (payload) => {
        dispatch({
            type: SET_SEARCH_LISTING,
            payload: payload
        })
    }

    const setFocusInput = (payload) => {
        dispatch({
            type: SET_FOCUS_INPUT,
            payload: payload
        })
    }

    return { setSearchListing, setFocusInput }
}

export default useCategories