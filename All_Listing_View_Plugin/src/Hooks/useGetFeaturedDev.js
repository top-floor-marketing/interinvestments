// react-query
import { useQueryHelper } from '../GraphqlClient/useRequest';
import { LISTINGS_CATEGORY, ALL_NEIGHBORHOODS, ACF_OPTIONS_GlOBAL_OPTIONS, ALL_LISTINGS_DEVELOPMENTS } from '../GraphqlClient/GQL';

// redux
import { useSelector, useDispatch } from 'react-redux'
import { actionslices } from '../components/store'

const useGetFeaturedDev = () => {
    // redux vales
    const dispatch = useDispatch()
    const { setIsLoading, setcISError, setDataCategory, setDataNeighborhood, setDataMapApiKey } = actionslices
    // const { search: SearchValue } = useSelector((state) => state.filter)
    const { dataCategory, isLoading, isError, dataNei } = useSelector((state) => state.statusQuery)

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
                dispatch(setIsLoading(true))
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
            },
            onError: () => {
                // dispatch loading global false
                dispatch(setIsLoading(true))
                // set error
                dispatch(setcISError(true))
            },
        }
    });

    // 3
    useQueryHelper({
        name: 'ACF_OPTIONS_GlOBAL_OPTIONS_By_AllListingView',
        gql: ACF_OPTIONS_GlOBAL_OPTIONS,
        config: {
            enabled: dataCategory.length > 0 && dataNei.length > 0,
            onSuccess: (req) => {
                // dispatch loading global false
                dispatch(setIsLoading(false))
                // set data acf opcion
                dispatch(setDataMapApiKey(req.acfOptionsGlobalOptions.optionPage.mapApiKey))
            },
            onError: () => {
                // dispatch loading global false
                dispatch(setIsLoading(true))
                // set error
                dispatch(setcISError(true))
            },
        },
    });

    console.log('ALL_LISTINGS_DEVELOPMENTS', ALL_LISTINGS_DEVELOPMENTS())

    return {
        isError,
        isLoading
    }
}

export default useGetFeaturedDev