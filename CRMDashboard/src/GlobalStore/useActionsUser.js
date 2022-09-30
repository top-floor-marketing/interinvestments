import {DEFAULT_ROUTE, ROUTES_NAMES} from '../Route/routes';

import { LOCAL_STORAGE } from '../Utils/globalConstants';

import { USER_ROLES_CRM } from './utils';

import get from 'lodash/get';
import isString from 'lodash/isString';
import toLower from 'lodash/toLower';

export const STORE_USER_ACTIONS = {
  IS_LOADING_FULL: "set_is_loading_full",
  ROUTE: "set_route",
  INFO_USER: "set_info_user",
  LOGOUT_USER: "set_logout_user",
  LISTING_CATEGORIES: "set_listing_categories",
  LISTING_NEI: "set_listing_nei",
  LISTING_FEATURED: "set_listing_featured",
};

export const DEFAULT_STORE_USER = {
    isLoadingFull: true,
    route: DEFAULT_ROUTE,
    infoUser: null,
    listingCategories: [],
    listingNei: [],
    listingFeaturedAgent: []
}

export const getAgentTypeByRole = (val) => {
    const _valTemp = JSON.parse(JSON.stringify(val));
    /* 
      Query UserById = roles: { nodes: array[] }
      Query DataAgent = roles: String
    */
    let userRol = '';
    if(isString(get(_valTemp, ["roles"], null))) {
        userRol = toLower(get(_valTemp, ["roles"]), USER_ROLES_CRM.AGENT);
    } else {
        userRol = toLower(get(_valTemp, ["roles","nodes", "0", "displayName"], USER_ROLES_CRM.AGENT));
    }
    return (userRol === "administrator") ? USER_ROLES_CRM.ADMIN : USER_ROLES_CRM.AGENT;
}

const useActionsUser = (dispatch) => {

    const setInfoUser = (val) => {
        const agentType = getAgentTypeByRole(val)
        dispatch({
            type: STORE_USER_ACTIONS.INFO_USER,
            payload: {
                ...val,
                agentType
            }
        });
    }

    const setLogout = () => {
        localStorage.setItem(LOCAL_STORAGE.ROUTE, null);
        localStorage.setItem(LOCAL_STORAGE.TOKEN, null);
        localStorage.setItem(LOCAL_STORAGE.REFRESH, null);
        localStorage.setItem(LOCAL_STORAGE.USER, null);
        localStorage.setItem(LOCAL_STORAGE.LEAD_DETAIL_ID, null);
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
        setInfoUser,
        setLogout,
        setListingCategories,
        setListingNei,
        setListingFeaturedAgent
    }
}

export default useActionsUser;