import { useState } from "react";
import { useQueryHelper, useMutationHelper } from "../../../GraphqlClient/useRequest";
import { GET_LISTINGS_CATEGORY, GET_ALL_NEIGHBORHOODS_BY_CATEGORY, GET_ALL_LISTINGS } from "../../../GraphqlClient/listings.gql";
import { GET_AGENT_FEATURED_LISTING, MUTATION_ADD_AGENT_LISTING, MUTATION_DETELE_AGENT_LISTING } from "../../../GraphqlClient/agentProfile.gql";

import { notificationSuccess, notificationError } from "../../../Component/Notifications";
import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import { getAllListings, getListingCategory, getListingNei, getArrayIdListings } from "./utils.service";

import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { USER_ROLES_CRM } from "../../../GlobalStore/utils";
import { ROUTES_NAMES } from "../../../Route/routes";

const ENUM_NEIGHBORHOODS = (idCategory) => {
  switch (idCategory) {
    case "21":
      return "NEW_CONDOS";
    case "23":
      return "NEW_HOMES";
    case "22":
      return "RENTAL_COMMUNITIES";
    default:
      return "NEW_CONDOS";
  }
};

const PER_PAGE = 15;

const useGetListings = ({ refetchParentData }) => {

  const { state: { global: { route }, user: { infoUser: { databaseId, agentType }, listingFeaturedAgent }}, actions: { setListingCategories, setListingNei, setListingFeaturedAgent } } = useClientGlobalStore();

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
    name: ["get-category-listing-crm"],
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

  const { isError: isErrorNei, isSuccess: isSuccessNei } = useQueryHelper({
    name: ["get-neiborhood-listing-crm", categorySelect],
    gql: GET_ALL_NEIGHBORHOODS_BY_CATEGORY,
    config: {
      cacheTime: 10000,
      enabled:  !!(categorySelect),
      onSuccess: (response) => {
        const nei = getListingNei(response);
        setListingNei(nei);
      },
    },
    variables: {
      categorie: ENUM_NEIGHBORHOODS(categorySelect) 
    },
  });

  const { isSuccess: isSuccesFeatured, isError: isErrorFeatured, refetch: refetchAllFeatured } = useQueryHelper({
    name: ["get-agent-featured-listing-crm", databaseId, agentType],
    gql: GET_AGENT_FEATURED_LISTING,
    config: {
      onSuccess: (response) => { 
        setListingFeaturedAgent(getArrayIdListings(response));
      },
    },
    variables: {
      agentId: databaseId,
      agentType
    },
  });

  const { isError: isErrorAllListings, refetch } = useQueryHelper({
    name: ["get-all-listings-crm", searchText, neiSelect, categorySelect],
    gql: GET_ALL_LISTINGS(categorySelect, neiSelect),
    config: {
      enabled:  !!(categorySelect && isSuccessNei && isSuccesFeatured),
      cacheTime: 5000,
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
      LISTINGCATEGORY: !isEmpty(categorySelect) ? [categorySelect] : null,
      NEIGHBORHOOD: !isEmpty(neiSelect) ? [neiSelect] : null,
      search: searchText,
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
      }, 200);
    }
  }

  // MUTATIONS
  const { mutate: fetchAddNewListing } = useMutationHelper({
    name: ["add-agent-listing"],
    gql: MUTATION_ADD_AGENT_LISTING,
    config: {
      onSuccess: async () => {
        await refetchAllFeatured();
        await refetch();
        notificationSuccess({
          id: 'add-agent-listing',
          title: "Featured property added",
          color: 'success'
        });
        if(refetchParentData) {
          refetchParentData();
        }
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
    name: ["remove-agent-listing"],
    gql: MUTATION_DETELE_AGENT_LISTING,
    config: {
      onSuccess: async () => {
        await refetchAllFeatured();
        await refetch();
        notificationSuccess({
          id: 'remove-agent-listing',
          title: "Featured property removed",
          color: 'success'
        });
        if(refetchParentData) {
          refetchParentData();
        }
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
    }, 200);
  }

  const onChangeNei = (e) => {
    setIsLoadingListing(true);
    setCursorPaginator("");
    setNeiSelect(e);
    setTimeout(() => {
      refetch();
    }, 200);
  }

  const onChangeSearchText = (e) => {
    setSearchText(e.currentTarget.value);
    setCursorPaginator("");
    setTimeout(() => {
      refetch();
    }, 200);
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
    isSkeleton: isLoadingListing && (!categorySelect || !isSuccesFeatured),
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
    onConfirmRemove,
    isAdminView: agentType === USER_ROLES_CRM.ADMIN && route === ROUTES_NAMES.LISTINGS
  }

}

export default useGetListings;