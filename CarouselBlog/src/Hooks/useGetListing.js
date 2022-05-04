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
  const [dataQuickView, setDataQuickView] = useState({
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
    name: "get-list-categories",
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
  } = useQueryHelper({
    name: "get-single-listing",
    gql: GET_SINGLE_LISTING_GQL,
    config: {
      enabled: dataQuickView.id > 0,
      onSuccess: (response) => {
        const { listings } = response;
        let content = null;
        if (listings.nodes.length > 0) {
          const findListing = listings.nodes[0];
          content = {
            photos: findListing.listingData?.newDevelopment?.photos || [],
            ...findListing,
          };
        }
        setDataQuickView({
          ...dataQuickView,
          content: content,
        });
      },
      onError: () => {
        setDataQuickView({
          content: null,
          id: 0,
        });
      },
    },
    variables: {
      id: dataQuickView.id,
    },
  });

  const fetchListListing = () => {
    refetchListListing();
  };

  const openModalQuickView = (id) => {
    setDelayOverlay(true);
    setDataQuickView({
      ...dataQuickView,
      id: id,
    });
    setTimeout(() => {
      setDelayOverlay(false);
    }, 1500);
  };

  const onCloseModalQuickView = () => {
    setDataQuickView({
      content: null,
      id: 0,
    });
  };

  return {
    data: fullData,
    renderSkeleton: loadingCategories || isFirtsFetch || isFetchingCategories,
    isLoading:
      loadingCategories ||
      loadingListListing ||
      isFetchingCategories ||
      isFetchingListListing,
    isError: errorCategories || errorListListing,
    fetchListListing,
    openModalQuickView,
    showOverlay:
      loadingSingleListing || isFetchingSingleListing || delayOverlay,
    dataQuickView,
    showErrorSingleListing: errorSingleListing,
    onCloseModalQuickView,
  };
};

export default UseGetListing;
