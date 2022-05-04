import { SET_SEARCH_LISTING, SET_FOCUS_INPUT, SET_FOCUS_CARD, SET_FOCUS_Menu } from "../actionStore";

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

    const setFocusCard = (payload) => {
        dispatch({
            type: SET_FOCUS_CARD,
            payload: payload
        })
    }

    const setFocusMenu = (payload) => {
        dispatch({
            type: SET_FOCUS_Menu,
            payload: payload
        })
    }

    return { setSearchListing, setFocusInput, setFocusCard, setFocusMenu }
}

export default useCategories