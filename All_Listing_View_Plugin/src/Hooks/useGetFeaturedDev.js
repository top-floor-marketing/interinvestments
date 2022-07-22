import { useEffect } from 'react'
// react-query
import { useQueryHelper } from '../GraphqlClient/useRequest';
import { LISTINGS_CATEGORY, ALL_NEIGHBORHOODS, ACF_OPTIONS_GlOBAL_OPTIONS, ALL_LISTINGS_DEVELOPMENTS } from '../GraphqlClient/GQL';

// redux
import { useSelector, useDispatch } from 'react-redux'
import { actionslices } from '../components/store'

const useGetFeaturedDev = () => {
    // redux vales
    const dispatch = useDispatch()
    const {
        setIsLoading,
        setcISError,
        setDataCategory,
        setDataNeighborhood,
        setDataMapApiKey,
        setDataListing,
        setcategoy
    } = actionslices
    const { search, neighborhood, categoy } = useSelector((state) => state.filter)
    const { dataCategory, isLoading, isError, dataNei, mapApiKey } = useSelector((state) => state.statusQuery)

    // 1
    useQueryHelper({
        name: 'LISTINGS_CATEGORY_By_AllListingView',
        gql: LISTINGS_CATEGORY,
        variables: {
            first: 3
        },
        config: {
            onSuccess: (req) => {
                // set values category
                dispatch(setDataCategory(req.listingCategories.nodes))
                // defaut caregory
                dispatch(setcategoy(`${req.listingCategories.nodes[0].databaseId}`))
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

    const variablesListint = () => {
        let variables = {
            search
        }
        if (neighborhood) {
            variables = {
                ...variables,
                NEIGHBORHOOD: neighborhood
            }
        }
        if (categoy) {
            variables = {
                ...variables,
                LISTINGCATEGORY: categoy
            }
        }
        return variables
    }

    // 4
    const { refetch: refetchListing } = useQueryHelper({
        name: 'ALL_LISTINGS_DEVELOPMENTS_By_AllListingView',
        gql: ALL_LISTINGS_DEVELOPMENTS((categoy ? categoy : null), (neighborhood ? neighborhood : null)),
        config: {
            enabled: !!mapApiKey,
            onSuccess: (req) => {
                // set data acf opcion
                dispatch(setDataListing({ ...req.listings }))
                // dispatch loading global false
                dispatch(setIsLoading(false))
            },
            onError: () => {
                // dispatch loading global false
                dispatch(setIsLoading(true))
                // set error
                dispatch(setcISError(true))
            },
        },
        variables: { ...variablesListint() }
    });

    useEffect(() => {
        if (mapApiKey) {
            refetchListing()
        }
    }, [search, neighborhood, categoy, refetchListing, mapApiKey])

    return {
        isError,
        isLoading
    }
}

export default useGetFeaturedDev