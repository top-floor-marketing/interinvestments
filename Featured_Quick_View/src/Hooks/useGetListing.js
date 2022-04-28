import React, { useState } from "react";

import { useQueryHelper } from "../GraphqlClient/useRequest";
import {
  GET_LISTING_FEATURED_GQL,
  GET_CATEGORIES_GQL,
} from "../GraphqlClient/gql";

const UseGetListing = () => {
  const [fullData, setFullData] = useState([]);

  const {
    isLoading: loadingCategories,
    isFetching: fetchingCategories,
    isError: errorCategories,
    data: dataCategories,
  } = useQueryHelper({
    name: "get-categories",
    gql: GET_CATEGORIES_GQL,
    config: {
      onSuccess: (response) => {
        const { categories } = response;
        console.log("categories", categories);
      },
    },
  });

  return {
    data: fullData,
    loading: loadingCategories || fetchingCategories,
  };
};

export default UseGetListing;
