import { useState } from 'react';
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_AGENT_FEATURED_LISTING } from "../../../GraphqlClient/agentProfile.gql";

// global Store
import { useSelector } from "react-redux";

import get from 'lodash/get';

const useGetAgentListing = () => {

    const { infoUser: { databaseId } } = useSelector((state) => state.user);

    const [listingAgent,setListingAgent] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [arrayIdListings, setArrayIdListings] = useState([]);

    const formatResponseData = (response) => {
      const listings = get(response, ["dataAgent", "0", "listings", "nodes"], []);
      return listings;
    }

    const getArrayIdListings = (listings) => {
      return listings.reduce((accumulator, curValue) => {
        accumulator.push(curValue.databaseId);
        return accumulator;
      }, []);
    }

    const { isLoading: isLoadingQuery, isFetching: isFetchingQuery, isError, refetch } = useQueryHelper({
        name: "get-agent-featured-listing-crm",
        gql: GET_AGENT_FEATURED_LISTING,
        config: {
          onSuccess: (response) => {
            setIsSkeleton(false);
            const listings = formatResponseData(response);
            const idListings = getArrayIdListings(listings);
            setListingAgent(listings);
            setArrayIdListings(idListings);
          },
          onError: (e) => {
            setIsSkeleton(false);
          },
        },
        variables: {
            agentId: databaseId
        },
    });

    return {
        isError,
        isSkeleton,
        isLoading: isSkeleton || isLoadingQuery || isFetchingQuery,
        listingAgent,
        arrayIdListings,
        totalData: listingAgent ? listingAgent.length : 0, 
        refetchData: ()=> {}//refetch,
    }
}

export default useGetAgentListing;