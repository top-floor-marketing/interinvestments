import { useState } from "react";

import { useQueryHelper } from "../GraphqlClient/useRequest";
import {
  GET_LISTING_FEATURED_GQL,
  GET_CATEGORIES_GQL,
  GET_SINGLE_LISTING_GQL,
} from "../GraphqlClient/gql";

const UseGetListing = () => {
  const [isFirtsFetch, setIsFirtsFetch] = useState(true);
  const [fullData, setFullData] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [perPage] = useState(8);
  const [cursorPaginator, setCursorPaginator] = useState("");
  const [modalQuickView, setModalQuickView] = useState({
    id: 0,
    content: null,
  });
  const [delayOverlay, setDelayOverlay] = useState(false);

  const fullDataGenerator = (prevData, nextData) => {
    let nextData_ = [];
    nextData_ = nextData.map((val) => {
      return {
        title: val.title,
        subTitle: val.listingData.newDevelopment.nameOfDevelopment,
        id: val.databaseId,
        photos: val.listingData.newDevelopment.photos || [],
      };
    });
    return [...prevData, ...nextData_];
  };

  // first query
  const {
    isLoading: loadingCategories,
    isError: errorCategories,
    isFetching: isFetchingCategories,
  } = useQueryHelper({
    name: "get-categories",
    gql: GET_CATEGORIES_GQL,
    config: {
      onSuccess: (response) => {
        const { categories } = response;
        const filterCategory = categories.nodes.filter((val) => {
          return val.name.toLowerCase() === "featured developments";
        });
        if (filterCategory.length) {
          setCategoryId(filterCategory[0].databaseId);
        } else {
          setIsFirtsFetch(true);
        }
      },
      onError: () => {
        setIsFirtsFetch(false);
      },
    },
  });

  // second and main query, Dependent Query
  const {
    isLoading: loadingListListing,
    isFetching: isFetchingListListing,
    isError: errorListListing,
    refetch: refetchListListing,
  } = useQueryHelper({
    name: "get-list-listing-featured",
    gql: GET_LISTING_FEATURED_GQL,
    config: {
      enabled: categoryId > 0,
      onSuccess: (response) => {
        const { listings } = response;
        const { nodes, pageInfo } = listings;
        if (pageInfo.endCursor) {
          setCursorPaginator(pageInfo.endCursor);
        }
        const newData = fullDataGenerator(fullData, nodes);
        setFullData(newData);
        setIsFirtsFetch(false);
      },
      onError: () => {
        setIsFirtsFetch(false);
      },
    },
    variables: {
      categoryId: categoryId,
      perPage: perPage,
      after: cursorPaginator,
    },
  });

  // Get Specific Listing
  const {
    isLoading: loadingSingleListing,
    isFetching: isFetchingSingleListing,
    isError: errorSingleListing,
    refetch: refetchSingleListing,
  } = useQueryHelper({
    name: "get-single-listing",
    gql: GET_SINGLE_LISTING_GQL,
    config: {
      enabled: false,
      onSuccess: (response) => {
        const { listings } = response;
        setModalQuickView({
          ...modalQuickView,
          content: listings.nodes,
        });
      },
      onError: () => {
        setModalQuickView({
          content: null,
          id: 0,
        });
      },
    },
    variables: {
      id: modalQuickView.id,
    },
  });

  const fetchListListing = () => {
    refetchListListing();
  };

  const openQuickView = (id) => {
    setDelayOverlay(true);
    setModalQuickView({
      ...modalQuickView,
      id: id,
    });
    refetchSingleListing();
    setTimeout(() => {
      setDelayOverlay(false);
    }, 3000);
  };

  return {
    data: fullData,
    renderSkeleton:
      loadingCategories ||
      isFirtsFetch ||
      isFetchingCategories ||
      isFetchingListListing,
    isLoading:
      loadingCategories ||
      loadingListListing ||
      isFetchingCategories ||
      isFetchingListListing,
    isError: errorCategories || errorListListing,
    fetchListListing: fetchListListing,
    openQuickView: openQuickView,
    showOverlay:
      loadingSingleListing || isFetchingSingleListing || delayOverlay,
    modalQuickView,
  };
};

export default UseGetListing;
