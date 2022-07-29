import { useState } from 'react';
import { useQueryHelper } from "../../GraphqlClient/useRequest";
import { GET_LISTINGS_CATEGORY, GET_ALL_NEIGHBORHOODS, GET_ALL_LISTINGS } from "../../GraphqlClient/listings.gql";

// global Store
import { useSelector } from "react-redux";

import get from 'lodash/get';

const useGetListingFinder = (arrayIdListings) => {

    const { infoUser: { databaseId } } = useSelector((state) => state.user);

    const [allListings, setAllListings] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allNei, setAllNei] = useState([]);
    const [cursorPaginator, setCursorPaginator] = useState("");
    const [categorySelect, setCategorySelect] = useState(null);
    const [neiSelect, setNeiSelect] = useState(null);
    const PER_PAGE = 8;

    const getListingCategory = (response) => {
        return get(response, ["listingCategories", "nodes"], "");
    }

    const getListingNei = (response) => {
        return get(response, ["neighborhoods", "nodes"], "");
    }

    const getAllListings = (response) => {
        return get(response, ["listings", "nodes"], []);
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
            const newData = getAllListings(response);
            const { pageInfo } = response.listings;
            if (pageInfo.endCursor) {
                setCursorPaginator(pageInfo.endCursor);
            }
            setAllListings([...allListings, ...newData]);
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
        refetchData: refetch
    }

}

export default useGetListingFinder;