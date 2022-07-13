import React, {useReducer} from 'react';

import LeadsContext from './leadsContext';
import LeadsReducer from './leadsReducer';

import { SET_FILTER, SET_IS_SKELETON, SET_LEADS_DATA, SET_CURRENT_PAGE } from './leadsReducer';

const initialState = {
    filter: null,
    isSkeleton: true,
    leadsData: [],
    perPage: 10,
    currentPage: 1,
    cursorPaginator: "",
    totalData: 0
}

const LeadsProvider = (props) => {
    const [state, dispatch] = useReducer(LeadsReducer, initialState);

    const storeValue = {
        state,
        actions: {
            setFilter: (val) => {
                dispatch({
                    type: SET_FILTER,
                    payload: val
                });
            },
            setIsSkeleton: (val) => {
                dispatch({
                    type: SET_IS_SKELETON,
                    payload: val
                });
            },
            setLeadsData: (val) => {
                dispatch({
                    type: SET_LEADS_DATA,
                    payload: val
                });
            },
            setCurrentPage: (val) => {
                dispatch({
                    type: SET_CURRENT_PAGE,
                    payload: val
                });
            }
        }
    }
    return (
        <LeadsContext.Provider value={storeValue}>
            {props.children}
        </LeadsContext.Provider>
    )
}

export default LeadsProvider;