import * as actionName from "./actionStore";

import initialState from "./initalState";

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionName.SET_SEARCH_LISTING:
      return {
        ...state,
        searchListing: payload,
      };
    case actionName.SET_ALL_CATEGORIES:
      return {
        ...state,
        listCategories: payload,
      };

    case actionName.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: payload,
      };

    case actionName.SET_FOCUS_INPUT:
      return {
        ...state,
        focusInput: payload,
      };

    case actionName.SET_FOCUS_CARD:
      return {
        ...state,
        focusCard: payload,
      };

    case actionName.SET_FOCUS_Menu:
      return {
        ...state,
        focusMenu: payload,
      };

    case actionName.SET_LIST_NEIGHBORHOODS:
      return {
        ...state,
        listNeighborhoods: payload,
      };

    case actionName.SET_ACTIVE_NEIGHBORHOODS:
      return {
        ...state,
        activeNeighborhoods: payload,
      };

    case actionName.SET_LIST_LISTING:
      return {
        ...state,
        listListing: payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
