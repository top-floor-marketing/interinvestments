// actions 
export const SET_FILTER = 'set_filter';
export const SET_LOADING = 'set_loading';
export const SET_LEADS_DATA = 'set_leads_data';
export const SET_CURRENT_PAGE = 'set_current_page';

const leadsReducer = (state, action) => {
    switch(action.type) {
        case SET_FILTER:
          return {...state, filter: action.payload}
        case SET_LOADING:
          return {...state, isLoading: action.payload}
        case SET_LEADS_DATA:
          return {...state, leadsData: action.payload}
        case SET_CURRENT_PAGE:
          return {...state, currentPage: action.payload}
        default:
          return state
    }
}

export default leadsReducer;

