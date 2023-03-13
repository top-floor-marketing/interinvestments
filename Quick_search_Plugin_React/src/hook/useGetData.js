import { useQueryHelper } from "../GraphqlClient/useRequest";
import {
  LISTINGS_CATEGORY,
  ALL_NEIGHBORHOODS,
  ALL_LISTING,
} from "../GraphqlClient/GQL";
// utils
import {
  SELECT_NEIGHBORHOODS,
  ENUM_NEIGHBORHOODS,
} from "../utils/mapValueSelect";
// store
import useStore from "../Store/useStore";

const useGetData = () => {
  const {
    state: { activeCategory, searchListing, activeNeighborhoods },
    setCategories,
    setActiveCategory,
    setNeighborhoods,
    setactiveNeighborhoods,
    setListListing,
  } = useStore();

  // 1
  const {
    isError: isErrorCategory,
    data: dataCategory,
    isFetched: isFetchedCategory,
  } = useQueryHelper({
    name: ["LISTINGS_CATEGORY"],
    gql: LISTINGS_CATEGORY,
    variables: {
      first: 3,
    },
    config: {
      onSuccess: (req) => {
        setCategories(req.listingCategories.nodes);
        setActiveCategory(req.listingCategories.nodes[0].databaseId.toString());
      },
    },
  });

  // 2
  const {
    isLoading: isLoadingNeighborhoods,
    isFetching: isFetchingNeighborhoods,
    isError: isErrorNeighborhoods,
    data: dataNeighborhoods,
  } = useQueryHelper({
    name: ["ALL_NEIGHBORHOODS", activeCategory],
    gql: ALL_NEIGHBORHOODS,
    variables: {
      categorie: ENUM_NEIGHBORHOODS(activeCategory),
    },
    config: {
      enabled: parseInt(activeCategory) > 0,
      onSuccess: (req) => {
        setNeighborhoods(SELECT_NEIGHBORHOODS(req.neighborhoodByCategorie));
        setactiveNeighborhoods(
          SELECT_NEIGHBORHOODS(req.neighborhoodByCategorie)[0].value
        );
      },
    },
  });

  // 3
  const { isError: isErrorListing, isFetching: isFetchingListing } =
    useQueryHelper({
      name: ["ALL_LISTING", activeCategory, activeNeighborhoods, searchListing],
      gql: ALL_LISTING,
      variables: {
        LISTINGCATEGORY: activeCategory,
        search: searchListing,
        NEIGHBORHOOD: activeNeighborhoods,
      },
      config: {
        enabled:
          parseInt(activeCategory) > 0 &&
          !isLoadingNeighborhoods &&
          !isFetchingNeighborhoods,
        cacheTime: 0,
        notifyOnChangeProps: "all",
        onSuccess: (req) => {
          setListListing(req.listings.nodes);
        },
      },
    });

  return {
    isSkeleton:
      !isFetchedCategory &&
      !dataCategory &&
      !isFetchingNeighborhoods &&
      !dataNeighborhoods &&
      !isFetchingListing,
    isFetchedCategory: isFetchedCategory,
    isFetchingNeighborhoods: isFetchingNeighborhoods,
    isError: isErrorCategory || isErrorNeighborhoods || isErrorListing,
    isFetchingListing: isFetchingListing,
  };
};

export default useGetData;
