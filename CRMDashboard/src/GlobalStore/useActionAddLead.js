export const STORE_ADDLEAD_ACTIONS = {
    RESET_ALL: 'set_reset_all',
    CHANGE_STEP: 'set_change_step',
    CHANGE_TYPE_LEADS: 'set_change_type_leads',
    SET_LISTING_DATA: 'set_listing_data'
}

export const DEFAULT_STORE_ADD_LEAD = {
    stepperActive: 0,
    typeLeads: 'LISTING',
    dataForm: {},
    listingData: [],
    serviceData: []
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

    const setListingData = (val) => {
        dispatch({
            type: STORE_ADDLEAD_ACTIONS.SET_LISTING_DATA,
            payload: val
        });
    }

    return {
        setAllField,
        setstepperActive,
        setTypeLeads,
        setListingData
    }
}

export default useActionsAddLead