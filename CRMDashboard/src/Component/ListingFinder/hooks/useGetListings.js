import { useState } from "react";
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_LISTINGS_CATEGORY, GET_ALL_NEIGHBORHOODS, GET_ALL_LISTINGS } from "../../../GraphqlClient/listings.gql";

import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

const useGetListings = () => {

    const { actions: { setListingCategories, setListingNei } }= useClientGlobalStore();

    const [allListings, setAllListings] = useState([]);
    const [isLoadingListing, setIsLoadingListing] = useState(true);

    const [cursorPaginator, setCursorPaginator] = useState("");
    const PER_PAGE = 8;

    const [afterFetchCategories, setAfterFetchCategories] = useState(false);
    const [afterFetchNei, setAfterFetchNei] = useState(false);

    const [allCategories, setAllCategories] = useState([]);
    const [categorySelect, setCategorySelect] = useState(null);

    const [allNei, setAllNei] = useState([]);
    const [neiSelect, setNeiSelect] = useState(null);

    const { isError: isErrorCategory } = useQueryHelper({
        name: "get-category-listing-crm",
        gql: GET_LISTINGS_CATEGORY,
        config: {
            cacheTime: 10000,
            onSuccess: (response) => {
                setAllCategories(getListingCategory(response));
                setAfterFetchCategories(true);
                setListingCategories(['sadsadsad'])
            },
        },
        variables: {
            first: 3
        },
    });

    const { isError: isErrorNei } = useQueryHelper({
        name: "get-neiborhood-listing-crm",
        gql: GET_ALL_NEIGHBORHOODS,
        config: {
            cacheTime: 10000,
            onSuccess: (response) => {
                setAllNei(getListingNei(response));
                setAfterFetchNei(true);
            },
        }
    });

    const { refetch } = useQueryHelper({
        name: "get-all-listings-crm",
        gql: GET_ALL_LISTINGS(categorySelect, neiSelect),
        config: {
          enabled: (afterFetchCategories && afterFetchNei),
          onSuccess: (response) => {
            const newData = getAllListings(response, allListings);
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
          search: "",
          NEIGHBORHOOD: !isEmpty(neiSelect) ? [neiSelect] : null,
          LISTINGCATEGORY: !isEmpty(categorySelect) ? [categorySelect] : null
        },
      });

    const getListingCategory = (response) => {
        const tempCategory = get(response, ["listingCategories", "nodes"], []);
        const categorySegment = map(tempCategory, (val) => {
            return {
                value: "" + val.databaseId,
                label: val.name
            }
        });
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
        return neiSelect;
    }

    const getAllListings = (newResponse, oldResponse) => {
        const listingsResponse = get(newResponse, ["listings", "nodes"], []);
        const tempFullData = [...listingsResponse, ...oldResponse];
        return tempFullData.map((val) => {
          return {
            ...val,
            //isFeatured: findIndex(arrayIdListings, (val2) => val.databaseId === val2) > -1
          }
        })
      }

    const reFetchDataListing = (isReset) => {
        setIsLoadingListing(true);
        if(isReset) {
            setCursorPaginator("");
        }
        setTimeout(() => {
            refetch();
        }, 700)
    }  

    return {
        isSkeleton: !afterFetchCategories || !afterFetchNei,
        isError: isErrorNei || isErrorCategory,
        data: {
            allCategories,
            allNei
        },
        allListings,
        isLoading: isLoadingListing,
        totalData: allListings.length,
        refetchData: reFetchDataListing,
    }

}

export default useGetListings;