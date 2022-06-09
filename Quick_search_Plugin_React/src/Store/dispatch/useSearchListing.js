import {
    SET_SEARCH_LISTING,
    SET_FOCUS_INPUT,
    SET_FOCUS_CARD,
    SET_FOCUS_Menu,
    SET_LIST_NEIGHBORHOODS,
    SET_ACTIVE_NEIGHBORHOODS
} from "../actionStore";

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

    const setNeighborhoods = (payload) => {
        dispatch({
            type: SET_LIST_NEIGHBORHOODS,
            payload: payload
        })
    }

    const setactiveNeighborhoods = (payload) => {
        dispatch({
            type: SET_ACTIVE_NEIGHBORHOODS,
            payload: payload
        })
    }

    return {
        setSearchListing,
        setFocusInput,
        setFocusCard,
        setFocusMenu,
        setNeighborhoods,
        setactiveNeighborhoods
    }
}

export default useCategories