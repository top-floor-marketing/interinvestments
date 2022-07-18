// actions 
export const SET_FILTER = 'set_filter';
export const SET_IS_SKELETON = 'set_is_skeleton';
export const SET_LEADS_DATA = 'set_leads_data';
export const SET_CURRENT_PAGE = 'set_current_page';

const leadsReducer = (state, action) => {
    switch(action.type) {
        case SET_FILTER:
          return {...state, filter: action.payload}
        case SET_IS_SKELETON:
          return {...state, isSkeleton: action.payload}
        case SET_LEADS_DATA:
          return {...state, leadsData: action.payload}
        case SET_CURRENT_PAGE:
          return {...state, currentPage: action.payload}
        default:
          return state
    }
}

export default leadsReducer;

