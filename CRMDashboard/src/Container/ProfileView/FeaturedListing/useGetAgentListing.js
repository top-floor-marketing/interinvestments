import { useState } from 'react';
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_AGENT_FEATURED_LISTING } from "../../../GraphqlClient/agentProfile.gql";

// global Store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore';

import get from 'lodash/get';

const useGetAgentListing = () => {

    const { state: { user: { infoUser: { databaseId , agentType } } },
    actions: { setListingFeaturedAgent }
  } = useClientGlobalStore();

    const [listingAgent,setListingAgent] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [arrayIdListings, setArrayIdListings] = useState([]);

    const formatResponseData = (response) => {
      const listings = get(response, ["dataAgent", "0", "listings", "nodes"], []);
      return listings.map((val) => {
        return {
          ...val,
          isFeatured: true
        }
      });
    }

    const getArrayIdListings = (listings) => {
      return listings.reduce((accumulator, curValue) => {
        accumulator.push(curValue.databaseId);
        return accumulator;
      }, []);
    }

    const { isLoading: isLoadingQuery, isFetching: isFetchingQuery, isError } = useQueryHelper({
        name: "get-agent-featured-listing-crm",
        gql: GET_AGENT_FEATURED_LISTING,
        config: {
          onSuccess: (response) => {
            setIsSkeleton(false);
            const listings = formatResponseData(response);
            const idListings = getArrayIdListings(listings);
            setListingFeaturedAgent(idListings);
            setListingAgent(listings);
          },
          onError: (e) => {
            setIsSkeleton(false);
          },
        },
        variables: {
            agentId: databaseId,
            agentType
        },
    });

    return {
        isError,
        isSkeleton,
        isLoading: isSkeleton || isLoadingQuery || isFetchingQuery,
        listingAgent,
        totalData: listingAgent ? listingAgent.length : 0, 
        refetchData: null
    }
}

export default useGetAgentListing;