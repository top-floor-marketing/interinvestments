import React, {useReducer} from 'react';

import PipelineContext from './pipelineContext';
import PipelineReducer from './pipelineReducer';

import { SET_FILTER } from './pipelineReducer';

const initialState = {
    filter: null
}

const PipelineProvider = (props) => {
    const [state, dispatch] = useReducer(PipelineReducer, initialState);

    const storeValue = {
        state,
        actions: {
            setFilter: (newFilter) => {
                dispatch({
                    type: SET_FILTER,
                    payload: newFilter
                });
            }
        }
    }
    return (
        <PipelineContext.Provider value={storeValue}>
            {props.children}
        </PipelineContext.Provider>
    )
}

export default PipelineProvider;