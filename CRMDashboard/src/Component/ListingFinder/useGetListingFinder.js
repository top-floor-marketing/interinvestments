import { useState } from 'react';
import { useQueryHelper } from "../../GraphqlClient/useRequest";
import { GET_LISTINGS_CATEGORY, GET_ALL_NEIGHBORHOODS, GET_ALL_LISTINGS } from "../../GraphqlClient/listings.gql";

// global Store
import useClientGlobalStore from '../../GlobalStore/useClientGlobalStore';

import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

const useGetListingFinder = (arrayIdListings) => {

  const { state: { user: { infoUser: { databaseId } } } } = useClientGlobalStore();

  const [allListings, setAllListings] = useState([]);

  const [isResetData, setIsResetData] = useState(true);
  const [loadingRefresh, setLoadingRefresh] = useState(true);

  // category
  const [allCategories, setAllCategories] = useState([]);
  const [categorySelect, setCategorySelect] = useState(null);

  const [allNei, setAllNei] = useState([]);
  const [neiSelect, setNeiSelect] = useState(null);

  const [cursorPaginator, setCursorPaginator] = useState("");
  const PER_PAGE = 8;

  const onChangeCategory = (val) => {
    if (val !== categorySelect && !loadingRefresh) {
      setLoadingRefresh(true);
      setCursorPaginator("");
      setIsResetData(true);
      setCategorySelect(val);
      setTimeout(() => {
        refetch();
      }, 700)
      
    }
  }

 const  onChangeNei = (val) => {
    if (val !== neiSelect && !loadingRefresh) {
      setLoadingRefresh(true);
      setCursorPaginator("");
      setIsResetData(true);
      setNeiSelect(val);
      setTimeout(() => {
        refetch();
      }, 700)
    }
  }

  const getListingCategory = (response) => {
    const tempCategory = get(response, ["listingCategories", "nodes"], []);
    const categorySegment = map(tempCategory, (val) => {
      return {
        value: "" + val.databaseId,
        label: val.name
      }
    });
    if (categorySegment.length) {
      setCategorySelect(categorySegment[0].value);
    }
    return categorySegment;
  }

  const getListingNei = (response) => {
    const tempNei = get(response, ["neighborhoods", "nodes"], []);
    const neiSelect = map(tempNei, (val) => {
      return {
        value: "" + val.databaseId,
        label: val.name
      }
    });
    if (neiSelect.length) {
      setNeiSelect(neiSelect[0].value);
    }
    return neiSelect;
  }

  const getAllListings = (newResponse, oldResponse) => {
    const listingsResponse = get(newResponse, ["listings", "nodes"], []);
    const tempFullData = (isResetData) ? [...listingsResponse] : [...listingsResponse, ...oldResponse];
    return tempFullData.map((val, index) => {
      return {
        ...val,
        isFeatured: findIndex(arrayIdListings, (val2) => val.databaseId === val2) > -1
      }
    })
    /* const filterListingsById = filter(tempFullData, (val) => {
      return findIndex(arrayIdListings, (val2) => val.databaseId === val2) < 0;
    })
    return filterListingsById; */
  }

  const { isSuccess: isSuccessCategory } = useQueryHelper({
    name: "get-category-listing-crm",
    gql: GET_LISTINGS_CATEGORY,
    config: {
      enabled: true,
      onSuccess: (response) => {
        setAllCategories(getListingCategory(response));
      },
    },
    variables: {
      first: 3
    },
  });

  const { isSuccess: isSuccessNei } = useQueryHelper({
    name: "get-neiborhood-listing-crm",
    gql: GET_ALL_NEIGHBORHOODS,
    config: {
      enabled: isSuccessCategory,
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
      enabled: (isSuccessNei && isSuccessCategory),
      onSuccess: (response) => {
        const newData = getAllListings(response, allListings);
        const { pageInfo } = response.listings;
        if (pageInfo.endCursor) {
          setCursorPaginator(pageInfo.endCursor);
        } else {
          setCursorPaginator("");
        }
        setAllListings(newData);
        setIsResetData(false);
        setLoadingRefresh(false);
      },
      onError: (e) => {
        setAllListings([])
      },
    },
    variables: {
      perPage: PER_PAGE,
      after: cursorPaginator,
      search: "",
      NEIGHBORHOOD: !isEmpty(neiSelect) ? [neiSelect] : null,
      LISTINGCATEGORY: !isEmpty(categorySelect) ? [categorySelect] : null
    },
  });


  const validateRefetchListing = () => {
    if (!isEmpty(categorySelect) && !isEmpty(cursorPaginator) && !loadingRefresh) {
      refetch();
    }
  }


  return {
    isSkeleton: (!isFetched && !isSuccess) && (isSuccessNei && isSuccessCategory) && loadingRefresh,
    allListings,
    isLoading: isLoading || isFetching || loadingRefresh,
    totalData: allListings.length,
    refetchData: validateRefetchListing,
    allCategories,
    onChangeCategory,
    categorySelect,
    allNei,
    neiSelect,
    onChangeNei
  }

}

export default useGetListingFinder;