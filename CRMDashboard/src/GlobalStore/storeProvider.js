import React, {useReducer} from 'react';

import StoreContext from './storeContext';
import StoreReducer from './storeReducer';

import useActionsUser, { DEFAULT_STORE_USER } from './useActionsUser';
import { DEFAUL_STORE_THEME } from './useActionsTheme';

const initialState = {
    theme: DEFAUL_STORE_THEME,
    user: DEFAULT_STORE_USER
}

const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(StoreReducer, initialState);

    const actionsUser = useActionsUser({state, dispatch});

    const storeValue = {
        state,
        actions: {
            ...actionsUser
        }
    }
    return (
        <StoreContext.Provider value={storeValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;