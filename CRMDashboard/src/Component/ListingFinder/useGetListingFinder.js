import { useState } from 'react';
import { useQueryHelper } from "../../GraphqlClient/useRequest";
import { GET_LISTINGS_CATEGORY, GET_ALL_NEIGHBORHOODS, GET_ALL_LISTINGS } from "../../GraphqlClient/listings.gql";

// global Store
import { useSelector } from "react-redux";

import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import map from 'lodash/map';

const useGetListingFinder = (arrayIdListings) => {

  const { infoUser: { databaseId } } = useSelector((state) => state.user);

  const [allListings, setAllListings] = useState([]);

  // category
  const [allCategories, setAllCategories] = useState([]);
  const [categorySelect, setCategorySelect] = useState("");

  const [allNei, setAllNei] = useState([]);
  const [cursorPaginator, setCursorPaginator] = useState("");
  const [neiSelect, setNeiSelect] = useState(null);
  const PER_PAGE = 8;

  const onChangeCategory = (val) => {
    setCategorySelect(val);
  }

  const getListingCategory = (response) => {
    const tempCategory = get(response, ["listingCategories", "nodes"], []);
    const categorySegment = map(tempCategory, (val) => {
      return {
        value: ""+val.databaseId,
        label: val.name
      }
    });
    if(categorySegment.length) {
      onChangeCategory(categorySegment[0].value);
    }
    return categorySegment;
  }

  const getListingNei = (response) => {
    const tempNei = get(response, ["neighborhoods", "nodes"], []);
    return map(tempNei, (val) => {
      return {
        value: ""+val.databaseId,
        label: val.name
      }
    });
  }

  const getAllListings = (newResponse, oldResponse) => {
    const listingsResponse = get(newResponse, ["listings", "nodes"], []);
    const tempFullData = [...listingsResponse, ...oldResponse];
    return tempFullData;
    /* const filterListingsById = filter(tempFullData, (val) => {
      return findIndex(arrayIdListings, (val2) => val.databaseId === val2) < 0;
    })
    return filterListingsById; */
  }

  useQueryHelper({
    name: "get-category-listing-crm",
    gql: GET_LISTINGS_CATEGORY,
    config: {
      onSuccess: (response) => {
        setAllCategories(getListingCategory(response));
      },
      onError: (e) => {

      },
    },
    variables: {
      first: 3
    },
  });

  useQueryHelper({
    name: "get-neiborhood-listing-crm",
    gql: GET_ALL_NEIGHBORHOODS,
    config: {
      enabled: !!allCategories.length,
      onSuccess: (response) => {
        setAllNei(getListingNei(response));
      },
      onError: (e) => {

      },
    }
  });

  const { isLoading, isFetching, isSuccess, isFetched, refetch } = useQueryHelper({
    name: "get-all-listings-crm",
    gql: GET_ALL_LISTINGS(categorySelect, neiSelect),
    config: {
      enabled: !!(allCategories.length && allNei.length),
      onSuccess: (response) => {
        const newData = getAllListings(response, allListings);
        const { pageInfo } = response.listings;
        if (pageInfo.endCursor) {
          setCursorPaginator(pageInfo.endCursor);
        }
        setAllListings(newData);
      },
      onError: (e) => {
        setAllListings([])
      },
    },
    variables: {
      perPage: PER_PAGE,
      after: cursorPaginator,
      search: "",
      NEIGHBORHOOD: neiSelect,
      LISTINGCATEGORY: categorySelect
    },
  });

  return {
    isSkeleton: !isFetched || !isSuccess,
    allListings,
    isLoading: isLoading || isFetching,
    totalData: allListings.length,
    refetchData: refetch,
    allCategories,
    onChangeCategory,
    categorySelect,
    allNei
  }

}

export default useGetListingFinder;