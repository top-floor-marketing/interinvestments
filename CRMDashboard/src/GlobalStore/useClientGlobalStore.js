import { useContext } from "react";

import storeContext from "./storeContext";

const useClientGlobalStore = () => {
    const allStore = useContext(storeContext);
    return {
        ...allStore
    }
}

export default useClientGlobalStore;