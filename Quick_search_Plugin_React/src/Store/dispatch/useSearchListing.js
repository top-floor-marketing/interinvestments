import { SET_SEARCH_LISTING } from "../actionStore";

const useCategories = (dispatch) => {

    const setSearchListing = (payload) => {
        dispatch({
            type: SET_SEARCH_LISTING,
            payload: payload
        })
    }

    return { setSearchListing }
}

export default useCategories