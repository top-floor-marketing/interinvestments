import { useState } from "react";

import { useQueryHelper } from "../GraphqlClient/useRequest";
import {
  GET_LISTING_FEATURED_GQL,
  GET_CATEGORIES_GQL,
} from "../GraphqlClient/gql";

import { FAKE_DATA } from "./constants";

const UseGetListing = () => {
  const [fullData, setFullData] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [perPage] = useState(8);
  const [cursorPaginator, setCursorPaginator] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);

  const createFakeData = (prevData, nextData) => {
    const prevData_ = prevData.length ? prevData : FAKE_DATA;
    const nextData_ = [];

    return [...prevData_, ...nextData_];
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
        const newData = createFakeData(fullData, nodes);
        setFullData(newData);
      },
    },
    variables: {
      categoryId: categoryId,
      perPage: perPage,
      after: cursorPaginator,
    },
  });

  return {
    data: fullData,
    loading:
      loadingCategories ||
      fetchingCategories ||
      loadingListing ||
      fetchingListing,
    isError: errorCategories || errorListing,
  };
};

export default UseGetListing;
