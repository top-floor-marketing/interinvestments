import { useContext } from "react";
import { StoreContext } from './ProviderStore';
// hooks
import useCategories from "./dispatch/useCategories";
import useSearchListing from './dispatch/useSearchListing'

const useStore = (props) => {

    const { state, dispatch } = useContext(StoreContext);

    // hooks
    const dispatchCategories = useCategories(dispatch);
    const dispatchSearchListing = useSearchListing(dispatch)

    return {
        state,
        ...dispatchCategories,
        ...dispatchSearchListing
    }
}

export default useStore;