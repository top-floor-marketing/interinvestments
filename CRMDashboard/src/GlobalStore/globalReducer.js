import { ROUTES_NAMES } from "../Route/routes";

// user
import { DEFAULT_STORE_USER, STORE_USER_ACTIONS } from "./useActionsUser";

// lead 
import { STORE_ADDLEAD_ACTIONS, DEFAULT_STORE_ADD_LEAD } from './useActionAddLead'

// global
import { STORE_GLOBAL_DATA_ACTIONS } from "./useActionsGlobalData";

import { initialState } from "./storeProvider";

const StoreReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    // global actions
    case STORE_GLOBAL_DATA_ACTIONS.IS_LOADING_FULL:
      return {
        ...state,
        global: {
          ...state.global,
          isLoadingFull: action.payload,
        },
      };

    case STORE_GLOBAL_DATA_ACTIONS.ROUTE:
      return { ...state, global: { ...state.global, route: action.payload } };

    case STORE_GLOBAL_DATA_ACTIONS.STATUS_USER_LEAD:
      return {
        ...state,
        global: { ...state.global, statusUserLead: action.payload },
      };
    // end global actions

    // user actions
    case STORE_USER_ACTIONS.INFO_USER:
      return {
        ...state,
        user: {
          ...state.user,
          infoUser: { ...state.user.infoUser, ...action.payload },
        },
      };

    case STORE_USER_ACTIONS.LOGOUT_USER:
      return {
        ...state,
        user: {
          ...DEFAULT_STORE_USER,
        },
        global: {
          ...state.global,
          isLoadingFull: false,
          route: ROUTES_NAMES.AUTH,
        },
      };

    case STORE_USER_ACTIONS.LISTING_CATEGORIES:
      return {
        ...state,
        user: { ...state.user, listingCategories: action.payload },
      };

    case STORE_USER_ACTIONS.LISTING_NEI:
      return { ...state, user: { ...state.user, listingNei: action.payload } };

    case STORE_USER_ACTIONS.LISTING_FEATURED:
      return {
        ...state,
        user: { ...state.user, listingFeaturedAgent: action.payload },
      };

    // STORE_ADDLEAD_ACTIONS

    case STORE_ADDLEAD_ACTIONS.RESET_ALL:
      return {
        ...state,
        addLeads: DEFAULT_STORE_ADD_LEAD,
      };

    case STORE_ADDLEAD_ACTIONS.CHANGE_STEP:
      return {
        ...state,
        addLeads: {
          ...state.addLeads,
          stepperActive: action.payload,
        },
      };

    case STORE_ADDLEAD_ACTIONS.SET_IDAGENT:
      return {
        ...state,
        addLeads: {
          ...state.addLeads,
          idAgent: action.payload,
        },
      };


    case STORE_ADDLEAD_ACTIONS.CHANGE_TYPE_LEADS:
      return {
        ...state,
        addLeads: {
          ...state.addLeads,
          typeLeads: action.payload,
        },
      };

    case STORE_ADDLEAD_ACTIONS.SET_LISTING_DATA:
      return {
        ...state,
        addLeads: {
          ...state.addLeads,
          listingData: action.payload,
        },
      };

    case STORE_ADDLEAD_ACTIONS.SET_SERVICES_DATA:
      return {
        ...state,
        addLeads: {
          ...state.addLeads,
          serviceData: action.payload,
        },
      };

    case STORE_ADDLEAD_ACTIONS.SET_DATA_FORM:
      return {
        ...state,
        addLeads: {
          ...state.addLeads,
          dataForm: action.payload,
        },
      };

    case STORE_ADDLEAD_ACTIONS.SET_TOTAL_SERVICES:
      return {
        ...state,
        addLeads: {
          ...state.addLeads,
          totalServices: action.payload,
        },
      };

    case STORE_ADDLEAD_ACTIONS.SET_STATE_LEADS:
      return {
        ...state,
        addLeads: {
          ...state.addLeads,
          stateLeads: action.payload,
        },
      };

    case STORE_ADDLEAD_ACTIONS.SET_NOTE_LEADS:
      return {
        ...state,
        addLeads: {
          ...state.addLeads,
          noteLeads: action.payload,
        },
      };

    case STORE_ADDLEAD_ACTIONS.SET_LOADING_LEADS:
      return {
        ...state,
        addLeads: {
          ...state.addLeads,
          loading: action.payload,
        },
      };


    default:
      throw new Error();
  }
};

export default StoreReducer;