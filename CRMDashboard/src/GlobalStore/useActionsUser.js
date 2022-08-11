import {DEFAULT_ROUTE, ROUTES_NAMES} from '../Route/routes';

import { LOCAL_STORAGE } from '../Utils/globalConstants';
import { STORE_USER_ACTIONS } from './storeReducer';

export const DEFAULT_STORE_USER = {
    isLoadingFull: true,
    route: DEFAULT_ROUTE,
    infoUser: null,
    listingCategories: [],
    listingNei: [],
    listingFeaturedAgent: []
}

const useActionsUser = (dispatch) => {

    const setLoadingFull = (val) => {
        dispatch({
            type: STORE_USER_ACTIONS.IS_LOADING_FULL,
            payload: val
        });
    }

    const setRoute = (val) => {
        localStorage.setItem(LOCAL_STORAGE.ROUTE, val);
        dispatch({
            type: STORE_USER_ACTIONS.ROUTE,
            payload: val
        }); 
    }

    const setInfoUser = (val) => {
        dispatch({
            type: STORE_USER_ACTIONS.INFO_USER,
            payload: val
        });
    }

    const setLogout = () => {
        localStorage.setItem(LOCAL_STORAGE.ROUTE, null);
        localStorage.setItem(LOCAL_STORAGE.TOKEN, null);
        localStorage.setItem(LOCAL_STORAGE.REFRESH, null);
        localStorage.setItem(LOCAL_STORAGE.USER, null);
        localStorage.setItem(LOCAL_STORAGE.LEAD_DETAIL_ID, null);

        setRoute(ROUTES_NAMES.AUTH);
        localStorage.setItem(LOCAL_STORAGE.ROUTE, ROUTES_NAMES.AUTH);

        dispatch({
            type: STORE_USER_ACTIONS.LOGOUT_USER
        });

    }

    const setListingCategories = (val) => {
        dispatch({
            type: STORE_USER_ACTIONS.LISTING_CATEGORIES,
            payload: val
        });
    }

    const setListingNei = (val) => {
        dispatch({
            type: STORE_USER_ACTIONS.LISTING_NEI,
            payload: val
        });
    }

    const setListingFeaturedAgent = (val) => {
        dispatch({
            type: STORE_USER_ACTIONS.LISTING_FEATURED,
            payload: val
        });
    }

    return {
        setLoadingFull,
        setRoute,
        setInfoUser,
        setLogout,
        setListingCategories,
        setListingNei,
        setListingFeaturedAgent
    }
}

export default useActionsUser;