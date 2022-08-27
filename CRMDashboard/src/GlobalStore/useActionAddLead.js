export const STORE_ADDLEAD_ACTIONS = {
    RESET_ALL: 'set_reset_all',
    CHANGE_STEP: 'set_change_step'
}

export const DEFAULT_STORE_ADD_LEAD = {
    stepperActive: 0,
    listingData: {},
    serviceData: {}
}

const useActionsAddLead = (dispatch) => {

    const setAllField = () => {
        dispatch({
            type: STORE_ADDLEAD_ACTIONS.RESET_ALL,
            payload: null
        });
    }

    const setstepperActive = (valueStepp) => {

        // const resultVAlue = valueStepp()

        dispatch({
            type: STORE_ADDLEAD_ACTIONS.CHANGE_STEP,
            payload: valueStepp
        });
    }

    return {
        setAllField,
        setstepperActive
    }
}

export default useActionsAddLead