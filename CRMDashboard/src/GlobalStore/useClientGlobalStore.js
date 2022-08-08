import { useContext } from "react";

import storeContext from "./storeContext";

const useClientGlobalStore = () => {
    const { state, actions } = useContext(storeContext);
    return {
        state, 
        actions
    }
}

export default useClientGlobalStore;