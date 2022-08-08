import { ROUTES_NAMES } from "../Route/routes"
import { DEFAULT_STORE_USER } from "./useActionsUser"

export const STORE_USER_ACTIONS = {
    IS_LOADING_FULL: 'set_is_loading_full',
    ROUTE: 'set_route',
    INFO_USER: 'set_info_user',
    LOGOUT_USER: 'set_logout_user',
    LISTING_CATEGORIES: 'set_listing_categories',
    LISTING_NEI: 'set_listing_nei',
    LISTING_FEATURED: 'set_listing_featured'
}

const StoreReducer = (state, action) => {

    switch (action.type) {
        case STORE_USER_ACTIONS.IS_LOADING_FULL:
           
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoadingFull: action.payload
                }
            }

        case STORE_USER_ACTIONS.ROUTE:
            return { ...state, user: { ...state.user, route: action.payload } }

        case STORE_USER_ACTIONS.INFO_USER:
            return { ...state, user: { ...state.user, infoUser: action.payload } }

        case STORE_USER_ACTIONS.LOGOUT_USER:
            return { ...state, user: { ...DEFAULT_STORE_USER, isLoadingFull: false, route: ROUTES_NAMES.AUTH } }

        case STORE_USER_ACTIONS.LISTING_CATEGORIES:
            return { ...state, user: { ...state.user, listingCategories: action.payload } }

        case STORE_USER_ACTIONS.LISTING_NEI:
            return { ...state, user: { ...state.user, listingNei: action.payload } }

        case STORE_USER_ACTIONS.LISTING_FEATURED:
            return { ...state, user: { ...state.user, listingFeaturedAgent: action.payload } }

        default:
            return state
    }

}

export default StoreReducer;