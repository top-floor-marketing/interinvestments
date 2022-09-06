export const STORE_ADDLEAD_ACTIONS = {
    RESET_ALL: 'set_reset_all',
    CHANGE_STEP: 'set_change_step',
    CHANGE_TYPE_LEADS: 'set_change_type_leads',
    SET_SERVICES_DATA: 'set_services_data',
    SET_LISTING_DATA: 'set_listing_data',
    SET_DATA_FORM: 'set_data_form',
    SET_TOTAL_SERVICES: 'set_total_services',
    SET_STATE_LEADS: 'set_state_leads',
    SET_NOTE_LEADS: 'set_note_leads',
    SET_LOADING_LEADS: 'set_loading_leads'
}

export const DEFAULT_STORE_ADD_LEAD = {
    loading: false,
    stepperActive: 0,
    typeLeads: 'LISTING',
    dataForm: {},
    listingData: [],
    serviceData: [],
    totalServices: [],
    stateLeads: null,
    noteLeads: null
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

    const setServicesData = (val) => {
        dispatch({
            type: STORE_ADDLEAD_ACTIONS.SET_SERVICES_DATA,
            payload: val
        });
    }

    const setDataForm = (vuesForm) => {
        dispatch({
            type: STORE_ADDLEAD_ACTIONS.SET_DATA_FORM,
            payload: vuesForm
        });
    }

    const setTotalServices = (listServices) => {
        dispatch({
            type: STORE_ADDLEAD_ACTIONS.SET_TOTAL_SERVICES,
            payload: listServices
        });
    }

    const setStateLeads = (idState) => {
        dispatch({
            type: STORE_ADDLEAD_ACTIONS.SET_STATE_LEADS,
            payload: idState
        });
    }

    const setNoteLeads = (note) => {
        dispatch({
            type: STORE_ADDLEAD_ACTIONS.SET_NOTE_LEADS,
            payload: note
        });
    }

    const setLoadingLeads = (value) => {
        dispatch({
            type: STORE_ADDLEAD_ACTIONS.SET_LOADING_LEADS,
            payload: value
        });
    }

    return {
        setAllField,
        setLoadingLeads,
        setstepperActive,
        setTypeLeads,
        setTotalServices,
        setListingData,
        setDataForm,
        setServicesData,
        setStateLeads,
        setNoteLeads
    }
}

export default useActionsAddLead