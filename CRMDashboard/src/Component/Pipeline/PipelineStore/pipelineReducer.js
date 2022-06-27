// actions 
export const SET_FILTER = 'set_filter';

const pipelineReducer = (state, action) => {
    switch(action.type) {
        case SET_FILTER:
          return {...state, filter: action.payload}
        default:
          return state
      }
}

export default pipelineReducer;

