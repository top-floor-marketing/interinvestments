import React, { useReducer } from 'react';

import StoreContext from './storeContext';
import GlobalReducer from './globalReducer';

import useActionsUser, { DEFAULT_STORE_USER } from './useActionsUser';
import { DEFAUL_STORE_THEME } from './useActionsTheme';
// lead
import useActionsAddLead, { DEFAULT_STORE_ADD_LEAD } from './useActionAddLead'

const initialState = {
    theme: DEFAUL_STORE_THEME,
    user: DEFAULT_STORE_USER,
    addLeads: DEFAULT_STORE_ADD_LEAD
}

const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    const actionsUser = useActionsUser(dispatch);
    const actionAddlead = useActionsAddLead(dispatch)

    const storeValue = {
        state,
        actions: {
            ...actionsUser,
            ...actionAddlead
        },
    }
    return (
        <StoreContext.Provider value={storeValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;