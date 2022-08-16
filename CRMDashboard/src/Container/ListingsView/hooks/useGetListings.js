import { useState } from "react";
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_LISTINGS_CATEGORY, GET_ALL_NEIGHBORHOODS, GET_ALL_LISTINGS } from "../../../GraphqlClient/listings.gql";
import { GET_AGENT_FEATURED_LISTING } from "../../../GraphqlClient/agentProfile.gql";

import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import { getAllListings, getListingCategory, getListingNei, getArrayIdListings } from "./utils.service";

import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

const PER_PAGE = 8;

const useGetListings = () => {

  const { state: { user: { infoUser: { databaseId }, listingFeaturedAgent }}, actions: { setListingCategories, setListingNei, setListingFeaturedAgent } } = useClientGlobalStore();

  const [allListings, setAllListings] = useState([]);
  const [isLoadingListing, setIsLoadingListing] = useState(true);

  const [cursorPaginator, setCursorPaginator] = useState("");

  // filters values
  const [searchText, setSearchText] = useState('');
  const [categorySelect, setCategorySelect] = useState(null);
  const [neiSelect, setNeiSelect] = useState(null);

  const { isError: isErrorCategory } = useQueryHelper({
    name: "get-category-listing-crm",
    gql: GET_LISTINGS_CATEGORY,
    config: {
      cacheTime: 10000,
      onSuccess: (response) => {
        const categories = getListingCategory(response);
        setListingCategories(categories);
        setCategorySelect(get(categories, ["0", "value"], null));
      },
    },
    variables: {first: 3},
  });

  const { isError: isErrorNei } = useQueryHelper({
    name: "get-neiborhood-listing-crm",
    gql: GET_ALL_NEIGHBORHOODS,
    config: {
      cacheTime: 10000,
      onSuccess: (response) => {
        const nei = getListingNei(response);
        setListingNei(nei);
        setNeiSelect(get(nei, ["0", "value"], null));
      },
    }
  });

  const { isSuccess: isSuccesFeatured, isError: isErrorFeatured } = useQueryHelper({
    name: "get-agent-featured-listing-crm",
    gql: GET_AGENT_FEATURED_LISTING,
    config: {
      onSuccess: (response) => { 
        setListingFeaturedAgent(getArrayIdListings(response));
      },
    },
    variables: {
      agentId: databaseId
    },
  });

  const { isError: isErrorAllListings, refetch } = useQueryHelper({
    name: "get-all-listings-crm",
    gql: GET_ALL_LISTINGS(categorySelect, neiSelect),
    config: {
      enabled: !!(categorySelect && neiSelect && isSuccesFeatured),
      onSuccess: (response) => {
        const oldData = isEmpty(cursorPaginator) ? [] : allListings;
        const newData = getAllListings(response, oldData, listingFeaturedAgent);
        const { pageInfo } = response.listings;
        if (pageInfo.endCursor) {
          setCursorPaginator(pageInfo.endCursor);
        } else {
          setCursorPaginator("");
        }
        setAllListings(newData);
        setIsLoadingListing(false);
      },
      onError: (e) => {
        setAllListings([])
        setCursorPaginator("");
        setIsLoadingListing(false);
      },
    },
    variables: {
      perPage: PER_PAGE,
      after: cursorPaginator,
      search: searchText,
      NEIGHBORHOOD: !isEmpty(neiSelect) ? [neiSelect] : null,
      LISTINGCATEGORY: !isEmpty(categorySelect) ? [categorySelect] : null
    },
  });

  const reFetchDataListing = (isReset) => {
    if(!isLoadingListing) {
      setIsLoadingListing(true);
      if (isReset) {
        setCursorPaginator("");
      }
      setTimeout(() => {
        refetch();
      }, 500);
    }
  }

  const onChangeCategory = (e) => {
    setIsLoadingListing(true);
    setCursorPaginator("");
    setCategorySelect(e);
    setTimeout(() => {
      refetch();
    }, 500);
  }

  const onChangeNei = (e) => {
    setIsLoadingListing(true);
    setCursorPaginator("");
    setNeiSelect(e);
    setTimeout(() => {
      refetch();
    }, 500);
  }

  const onChangeSearchText = (e) => {
    setSearchText(e.currentTarget.value);
    setCursorPaginator("");
    setTimeout(() => {
      refetch();
    }, 500);
  }

  return {
    isSkeleton: isLoadingListing && (!categorySelect || !neiSelect || !isSuccesFeatured),
    isError: isErrorNei || isErrorCategory || isErrorFeatured || isErrorAllListings,
    categoryProps: {
      onChange: onChangeCategory,
      value: categorySelect
    }, 
    neiProps: {
      onChange: onChangeNei,
      value: neiSelect
    },
    searchProps: {
      onChange: onChangeSearchText,
      value: searchText
    },
    allListings,
    isLoading: isLoadingListing,
    totalData: allListings.length,
    refetchData: reFetchDataListing,
  }

}

export default useGetListings;