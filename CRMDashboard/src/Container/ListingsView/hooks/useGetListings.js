import { useState } from "react";
import { useQueryHelper, useMutationHelper } from "../../../GraphqlClient/useRequest";
import { GET_LISTINGS_CATEGORY, GET_ALL_NEIGHBORHOODS, GET_ALL_LISTINGS } from "../../../GraphqlClient/listings.gql";
import { GET_AGENT_FEATURED_LISTING, MUTATION_ADD_AGENT_LISTING, MUTATION_DETELE_AGENT_LISTING } from "../../../GraphqlClient/agentProfile.gql";

import { notificationSuccess, notificationError } from "../../../Component/Notifications";
import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import { getAllListings, getListingCategory, getListingNei, getArrayIdListings } from "./utils.service";

import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

const PER_PAGE = 8;

const useGetListings = () => {

  const { state: { user: { infoUser: { databaseId }, listingFeaturedAgent }}, actions: { setListingCategories, setListingNei, setListingFeaturedAgent } } = useClientGlobalStore();

  const [allListings, setAllListings] = useState([]);


  const [isLoadingListing, setIsLoadingListing] = useState(true);
  const [isOverlay, setIsOverlay] = useState(false);

  const [cursorPaginator, setCursorPaginator] = useState("");
  const [prevCursorPaginator, setPrevCursorPaginatr] = useState("");

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

  const { isSuccess: isSuccesFeatured, isError: isErrorFeatured, refetch: refetchAllFeatured } = useQueryHelper({
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
          setPrevCursorPaginatr(cursorPaginator);
          setCursorPaginator(pageInfo.endCursor);
        } else {
          setCursorPaginator("");
          setPrevCursorPaginatr("");
        }
        setAllListings(newData);
        setIsLoadingListing(false);
        setIsOverlay(false);
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

  // MUTATIONS
  const { mutate: fetchAddNewListing } = useMutationHelper({
    name: "add-agent-listing",
    gql: MUTATION_ADD_AGENT_LISTING,
    config: {
      onSuccess: async () => {
        await refetchAllFeatured();
        await refetch();
        notificationSuccess({
          id: 'add-agent-listing',
          title: "Listing added",
          color: 'success'
        });
      },
      onError: async () => {
        await refetch();
        notificationError({
          id: 'add-agent-listing',
          title: "Error",
          color: 'secondary'
        })
      },
    },
  });
  const { mutate: fetchRemoveListing } = useMutationHelper({
    name: "remove-agent-listing",
    gql: MUTATION_DETELE_AGENT_LISTING,
    config: {
      onSuccess: async () => {
        await refetchAllFeatured();
        await refetch();
        notificationSuccess({
          id: 'remove-agent-listing',
          title: "Listing removed",
          color: 'success'
        });
      },
      onError: async () => {
        await refetch();
        notificationError({
          id: 'remove-agent-listing',
          title: "Error",
          color: 'secondary'
        })
      },
    },
  });
  // END MUTATIONS

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

  const onConfirmAdd = (id) => {
    setIsOverlay(true);
    setIsLoadingListing(true);
    setCursorPaginator(prevCursorPaginator);
    fetchAddNewListing({
      variables: {
        id: databaseId,
        listings: [id]
      }
    })
  }

  const onConfirmRemove = (id) => {
    setIsOverlay(true);
    setIsLoadingListing(true);
    setCursorPaginator(prevCursorPaginator);
    fetchRemoveListing({
      variables: {
        id: databaseId,
        listings: [id]
      }
    })
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
    isOverlay,
    totalData: allListings.length,
    refetchData: reFetchDataListing,
    onConfirmAdd,
    onConfirmRemove
  }

}

export default useGetListings;