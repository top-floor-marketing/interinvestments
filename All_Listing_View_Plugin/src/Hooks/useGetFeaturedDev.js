import { useEffect, useState } from "react";
// react-query
import { useQueryHelper } from "../GraphqlClient/useRequest";
import {
  LISTINGS_CATEGORY,
  ALL_NEIGHBORHOODS,
  ACF_OPTIONS_GlOBAL_OPTIONS,
  ALL_LISTINGS_DEVELOPMENTS,
} from "../GraphqlClient/GQL";
// utils
import { ENUM_NEIGHBORHOODS } from "../utils";
// redux
import { useSelector, useDispatch } from "react-redux";
import { actionslices } from "../components/store";
// lodash
import toInteger from "lodash/toInteger";
import toLower from "lodash/toLower";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

const URL_SHARED_FLAG = "shared";
const URL_QUERY_ID_NAME = "agent-id";

const useGetFeaturedDev = () => {
  // redux vales
  const dispatch = useDispatch();
  const {
    setIsLoading,
    setcISError,
    setDataCategory,
    setDataNeighborhood,
    setDataMapApiKey,
    setDataListing,
    setSearch,
    setneighborhood,
    setCategory,
  } = actionslices;
  const { search, neighborhood, category } = useSelector(
    (state) => state.filter
  );
  const {
    dataCategory,
    dataListing,
    pageInfoListing,
    isError,
    dataNei,
    mapApiKey,
  } = useSelector((state) => state.statusQuery);

  const [perPage] = useState(15);

  const getUriWithAgentId = (uri) => {
    const queryParams = new URLSearchParams(window.location.search);
    const isShared = toLower(queryParams.get(URL_SHARED_FLAG)) === "true";
    const idInUrl = toInteger(queryParams.get(URL_QUERY_ID_NAME));
    return isShared && idInUrl
      ? `${uri}?${URL_QUERY_ID_NAME}=${idInUrl}&${URL_SHARED_FLAG}=true`
      : uri;
  };

  // get values url
  const urlParams = new URLSearchParams(window.location.search);
  const value_Neighborhood_URL = urlParams.get("nei");
  const value_category_URL = urlParams.get("cat");
  const value_search_URL = urlParams.get("search");

  // 1
  useQueryHelper({
    name: "LISTINGS_CATEGORY_By_AllListingView",
    gql: LISTINGS_CATEGORY,
    variables: {
      first: 3,
    },
    config: {
      onSuccess: (req) => {
        // set values category
        dispatch(setDataCategory(req.listingCategories.nodes));

        // set default value search
        if (value_search_URL) {
          dispatch(setSearch(value_search_URL));
        }

        // defaut caregory
        if (value_category_URL) {
          dispatch(setCategory(value_category_URL));
        } else {
          dispatch(setCategory(`${req.listingCategories.nodes[0].databaseId}`));
        }
      },
      onError: () => {
        // dispatch loading global false
        dispatch(setIsLoading(true));
        // set error
        dispatch(setcISError(true));
      },
    },
  });

  // 2
  const {
    refetch: refetchNeightborhoods,
    isFetching: isFetchingNeightborhoods,
  } = useQueryHelper({
    name: "ALL_NEIGHBORHOODS_By_AllListingView",
    gql: ALL_NEIGHBORHOODS,
    variables: {
      categorie: ENUM_NEIGHBORHOODS(category),
    },
    config: {
      enabled: dataCategory.length > 0 && category ? true : false,
      onSuccess: (req) => {
        // set data nei
        dispatch(setDataNeighborhood(req.neighborhoodByCategorie));
        // set default vaue
        if (value_Neighborhood_URL) {
          dispatch(setneighborhood(value_Neighborhood_URL));
        }
      },
      onError: () => {
        // dispatch loading global false
        dispatch(setIsLoading(true));
        // set error
        dispatch(setcISError(true));
      },
    },
  });

  // 3
  useQueryHelper({
    name: "ACF_OPTIONS_GlOBAL_OPTIONS_By_AllListingView",
    gql: ACF_OPTIONS_GlOBAL_OPTIONS,
    config: {
      enabled: dataCategory.length > 0 && dataNei.length > 0,
      onSuccess: (req) => {
        // set data acf opcion
        dispatch(
          setDataMapApiKey(req.acfOptionsGlobalOptions.optionPage.mapApiKey)
        );
      },
      onError: () => {
        // dispatch loading global false
        dispatch(setIsLoading(true));
        // set error
        dispatch(setcISError(true));
      },
    },
  });

  const variablesListint = () => {
    let variables = {
      perPage,
      after: get(pageInfoListing, ["endCursor"], ""),
    };
    if (search) {
      variables = {
        ...variables,
        search,
      };
    }
    if (neighborhood) {
      variables = {
        ...variables,
        NEIGHBORHOOD: neighborhood,
      };
    }
    if (category) {
      variables = {
        ...variables,
        LISTINGCATEGORY: [category],
      };
    }
    return variables;
  };

  // 4
  const {
    isLoading: isLoadingListing,
    isFetching: isFetchingListing,
    refetch: refetchListing,
    isFetched,
    isSuccess,
  } = useQueryHelper({
    name: "ALL_LISTINGS_DEVELOPMENTS_By_AllListingView",
    gql: ALL_LISTINGS_DEVELOPMENTS(
      category ? category : null,
      neighborhood ? neighborhood : null
    ),
    config: {
      enabled: !isEmpty(mapApiKey),
      onSuccess: (req) => {
        // set data acf opcion
        const newListingNodes = {
          ...req?.listings,
          nodes:
            req?.listings?.nodes?.map((val) => {
              return {
                ...val,
                uri: getUriWithAgentId(val.uri),
              };
            }) || [],
        };
        dispatch(
          setDataListing({
            data: {
              ...newListingNodes,
            },
          })
        );
        // dispatch loading global false
        dispatch(setIsLoading(false));
      },
      onError: () => {
        // dispatch loading global false
        dispatch(setIsLoading(true));
        // set error
        dispatch(setcISError(true));
      },
    },
    variables: {
      ...variablesListint(),
    },
  });

  useEffect(() => {
    if (category) {
      refetchNeightborhoods();
    }
  }, [category, refetchNeightborhoods]);

  useEffect(() => {
    if (!isEmpty(mapApiKey)) {
      refetchListing();
    }
  }, [search, neighborhood, category, refetchListing, mapApiKey]);

  return {
    isFetchingNeightborhoods,
    isError,
    isSkeleton: !isFetched && !isSuccess,
    refetchListing,
    dataListing,
    totalData: dataListing.length,
    loadingListing: isFetchingListing || isLoadingListing,
  };
};

export default useGetFeaturedDev;
