import { useState } from "react";

import { useQueryHelper } from "../GraphqlClient/useRequest";
import {
  GET_LISTING_FEATURED_GQL,
  GET_CATEGORIES_GQL,
} from "../GraphqlClient/gql";

const UseGetListing = () => {
  const [fullData, setFullData] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [perPage] = useState(4);
  const [cursorPaginator, setCursorPaginator] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);

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
    isFetching: fetchingCategories,
    isError: errorCategories,
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
        }
      },
    },
  });

  // second and main query, Dependent Query
  const {
    isLoading: loadingListing,
    isFetching: fetchingListing,
    isError: errorListing,
  } = useQueryHelper({
    name: "get-listing-featured",
    gql: GET_LISTING_FEATURED_GQL,
    config: {
      enabled: categoryId > 0,
      onSuccess: (response) => {
        const { listings } = response;
        const { nodes, pageInfo } = listings;
        setCursorPaginator(pageInfo.endCursor);
        setHasNextPage(pageInfo.hasNextPage);
        const newData = fullDataGenerator(fullData, nodes);
        setFullData(newData);
      },
    },
    variables: {
      categoryId: categoryId,
      perPage: perPage,
      after: cursorPaginator,
    },
  });

  const fetchListing = () => {
    alert("LOAD MORE");
  };

  return {
    data: fullData,
    isLoading:
      loadingCategories ||
      fetchingCategories ||
      loadingListing ||
      fetchingListing,
    isError: errorCategories || errorListing,
    fetchListing: fetchListing,
  };
};

export default UseGetListing;
