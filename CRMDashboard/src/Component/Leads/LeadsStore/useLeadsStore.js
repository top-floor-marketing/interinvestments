import { useContext } from "react";

import LeadsContext from "./leadsContext";

const useLeadsStore = () => {
    const { state, actions } = useContext(LeadsContext);
    return {
        state, 
        actions
    }
}

export default useLeadsStore;