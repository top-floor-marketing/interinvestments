import { ROUTES_NAMES } from "../Route/routes";
import { DEFAULT_STORE_USER } from "./useActionsUser";
import { DEFAUL_STORE_THEME } from "./useActionsTheme";
// lead 
import { STORE_ADDLEAD_ACTIONS, DEFAULT_STORE_ADD_LEAD } from './useActionAddLead'

export const STORE_USER_ACTIONS = {
    IS_LOADING_FULL: 'set_is_loading_full',
    ROUTE: 'set_route',
    INFO_USER: 'set_info_user',
    LOGOUT_USER: 'set_logout_user',
    LISTING_CATEGORIES: 'set_listing_categories',
    LISTING_NEI: 'set_listing_nei',
    LISTING_FEATURED: 'set_listing_featured'
}


const StoreReducer = (state = { theme: DEFAUL_STORE_THEME, user: DEFAULT_STORE_USER, addLeads: DEFAULT_STORE_ADD_LEAD }, action) => {

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
            return { ...state, user: { ...state.user, infoUser: { ...state.user.infoUser, ...action.payload } } }

        case STORE_USER_ACTIONS.LOGOUT_USER:
            return { ...state, user: { ...DEFAULT_STORE_USER, isLoadingFull: false, route: ROUTES_NAMES.AUTH } }

        case STORE_USER_ACTIONS.LISTING_CATEGORIES:
            return { ...state, user: { ...state.user, listingCategories: action.payload } }

        case STORE_USER_ACTIONS.LISTING_NEI:
            return { ...state, user: { ...state.user, listingNei: action.payload } }

        case STORE_USER_ACTIONS.LISTING_FEATURED:
            return { ...state, user: { ...state.user, listingFeaturedAgent: action.payload } }

        case STORE_ADDLEAD_ACTIONS.RESET_ALL:
            return {
                ...state,
                addLeads: DEFAULT_STORE_ADD_LEAD
            }

        case STORE_ADDLEAD_ACTIONS.CHANGE_STEP:
            return {
                ...state,
                addLeads: {
                    ...state.addLeads,
                    stepperActive: action.payload
                }
            }

        case STORE_ADDLEAD_ACTIONS.CHANGE_TYPE_LEADS:
            return {
                ...state,
                addLeads: {
                    ...state.addLeads,
                    typeLeads: action.payload
                }
            }

        case STORE_ADDLEAD_ACTIONS.SET_LISTING_DATA:
            return {
                ...state,
                addLeads: {
                    ...state.addLeads,
                    listingData: action.payload
                }
            }

        case STORE_ADDLEAD_ACTIONS.SET_SERVICES_DATA:
            return {
                ...state,
                addLeads: {
                    ...state.addLeads,
                    serviceData: action.payload
                }
            }

        case STORE_ADDLEAD_ACTIONS.SET_DATA_FORM:
            return {
                ...state,
                addLeads: {
                    ...state.addLeads,
                    dataForm: action.payload
                }
            }

        default:
            throw new Error();
    }

}

export default StoreReducer;