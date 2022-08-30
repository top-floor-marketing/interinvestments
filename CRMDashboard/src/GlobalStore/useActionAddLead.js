export const STORE_ADDLEAD_ACTIONS = {
    RESET_ALL: 'set_reset_all',
    CHANGE_STEP: 'set_change_step',
    CHANGE_TYPE_LEADS: 'set_change_type_leads'
}

export const DEFAULT_STORE_ADD_LEAD = {
    stepperActive: 0,
    typeLeads: 'LISTING',
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
        dispatch({
            type: STORE_ADDLEAD_ACTIONS.CHANGE_STEP,
            payload: valueStepp
        });
    }

    const setTypeLeads = (newType) => {
        dispatch({
            type: STORE_ADDLEAD_ACTIONS.CHANGE_TYPE_LEADS,
            payload: newType
        });
    }

    return {
        setAllField,
        setstepperActive,
        setTypeLeads
    }
}

export default useActionsAddLead