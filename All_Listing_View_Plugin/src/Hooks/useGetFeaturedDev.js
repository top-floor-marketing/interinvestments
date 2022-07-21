// react-query
import { useQueryHelper } from '../GraphqlClient/useRequest';
import { LISTINGS_CATEGORY, ALL_NEIGHBORHOODS } from '../GraphqlClient/GQL';

// redux
import { useSelector, useDispatch } from 'react-redux'
import { actionslices } from '../components/store'

const useGetFeaturedDev = () => {
    // redux vales
    const dispatch = useDispatch()
    const { setIsLoading, setcISError, setDataCategory, setDataNeighborhood } = actionslices
    // const { search: SearchValue } = useSelector((state) => state.filter)
    const { dataCategory, isLoading, isError } = useSelector((state) => state.statusQuery)

    // 1
    useQueryHelper({
        name: 'LISTINGS_CATEGORY_By_AllListingView',
        gql: LISTINGS_CATEGORY,
        variables: {
            first: 3
        },
        config: {
            onSuccess: (req) => {
                dispatch(setDataCategory(req.listingCategories.nodes))
            },
            onError: () => {
                // dispatch loading global false
                dispatch(setIsLoading(false))
                // set error
                dispatch(setcISError(true))
            },
        }
    });

    // 2
    useQueryHelper({
        name: 'ALL_NEIGHBORHOODS_By_AllListingView',
        gql: ALL_NEIGHBORHOODS,
        config: {
            enabled: dataCategory.length > 0,
            onSuccess: (req) => {
                // set data nei
                dispatch(setDataNeighborhood(req.neighborhoods.nodes))
                dispatch(setIsLoading(false))
            },
            onError: () => {
                // dispatch loading global false
                dispatch(setIsLoading(false))
                // set error
                dispatch(setcISError(true))
            },
        }
    });

    // 3
    /* const tres = useQueryHelper({
         name: 'LISTINGS_CATEGORY_By_AllListingView',
         gql: LISTINGS_CATEGORY,
         variables: {
             first: 3
         },
         config: {
             enabled: dataCategory.length > 0 && dataNei.length > 0,
             onSuccess: (req) => {
                 // dispatch loading global false
                 // set data listing
             },
             onError: () => {
                 // dispatch loading global false
                 // set error
             },
         },
         variables: {
 
         }
     }); */

    return {
        isError,
        isLoading
    }
}

export default useGetFeaturedDev