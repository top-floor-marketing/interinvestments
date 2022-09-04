import { DEFAULT_ROUTE } from "../Route/routes";

import { LOCAL_STORAGE } from "../Utils/globalConstants";

export const STORE_GLOBAL_DATA_ACTIONS = {
  IS_LOADING_FULL: "set_is_loading_full",
  ROUTE: 'set_route',
  STATUS_USER_LEAD: 'set_status_user_lead'
};

export const DEFAULT_STORE_GLOBAL_DATA = {
  isLoadingFull: true,
  route: DEFAULT_ROUTE,
  statusUserLead: []
};

const useActionsGlobalData = (dispatch) => {
  const setLoadingFull = (val) => {
    dispatch({
      type: STORE_GLOBAL_DATA_ACTIONS.IS_LOADING_FULL,
      payload: val,
    });
  };

  const setRoute = (val) => {
    localStorage.setItem(LOCAL_STORAGE.ROUTE, val);
    dispatch({
      type: STORE_GLOBAL_DATA_ACTIONS.ROUTE,
      payload: val,
    });
  };

  const setStatusUserLead = (val) => {
    dispatch({
      type: STORE_GLOBAL_DATA_ACTIONS.STATUS_USER_LEAD,
      payload: val,
    });
  };

  return {
    setLoadingFull,
    setRoute,
    setStatusUserLead,
  };

};

export default useActionsGlobalData;
