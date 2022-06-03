import { useState } from "react";

import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_ALL_LISTINGS } from "./gql";

import get from "lodash/get";

const useGetListing = () => {
  const [firtsMount, setFirtsMount] = useState(false);
  const [perPage] = useState(20);
  const [listingData, setListingData] = useState([]);
  const [cursorPaginator, setCursorPaginator] = useState("");

  const { isLoading, isFetching, isError, refetch } = useQueryHelper({
    name: "get-all-listing-crm",
    gql: GET_ALL_LISTINGS,
    config: {
      onSuccess: (response) => {
        const { listings } = response;
        const { nodes, pageInfo } = listings;
        if (pageInfo.endCursor) {
          setCursorPaginator(pageInfo.endCursor);
        }
        setFirtsMount(false);
      },
      onError: () => {
        setFirtsMount(false);
      },
    },
    variables: {
      perPage: perPage,
      after: cursorPaginator,
    },
  });

  return {
    isSkeleton: firtsMount,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};

export default useGetListing;
