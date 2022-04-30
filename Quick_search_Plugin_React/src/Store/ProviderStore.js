import React, { createContext, useReducer } from 'react'
import reducer from './reducerStore'
import InitialState from './initalState'

// create context Store
export const StoreContext = createContext();

const ProviderStore = (props) => {
    const [stateLocal, dispatch] = useReducer(reducer, InitialState);
    return (
        <StoreContext.Provider value={{state: stateLocal, dispatch: dispatch}}>
            {
                props.children
            }
        </StoreContext.Provider>
    )
}

export default ProviderStore