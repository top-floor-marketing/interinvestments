import { useContext } from "react";

import { StoreContext } from './ProviderStore';

import useCategories from "./dispatch/useCategories";

const useStore = () => {

    const { state, dispatch } = useContext(StoreContext);

    // hooks
   const dispatchCategories = useCategories(dispatch);


    return {
        state,
        ...dispatchCategories
    }   
}

export default useStore;