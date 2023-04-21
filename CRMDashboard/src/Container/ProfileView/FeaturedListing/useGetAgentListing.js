import { useState } from 'react';
import { useQueryHelper } from "../../../GraphqlClient/hooks/useRequest";
import { GET_AGENT_FEATURED_LISTING, GET_LISTING_FEATURED_DEVELOPMENTS_OFFICE, GET_TAG_FEATURED_DEVELOPMENTS } from "../../../GraphqlClient/agentProfile.gql";

// global Store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore';

import get from 'lodash/get';

import { USER_ROLES_CRM  } from '../../../GlobalStore/utils';

const useGetAgentListing = ({ idAgent = null }) => {

  const { state: { user: { infoUser: { databaseId, agentType } } },
    actions: { setListingFeaturedAgent }
  } = useClientGlobalStore();

  const [listingAgent, setListingAgent] = useState([]);
  const [isSkeleton, setIsSkeleton] = useState(true);

  const useOfficeFeatured = (!idAgent && agentType === USER_ROLES_CRM.ADMIN);
  
  const formatResponseDataAdmin = (response) => {
    const listings = get(response, ["listings", "nodes"], []);
    return listings.map((val) => {
      return {
        ...val,
        isFeatured: true
      }
    });
  }

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

  // first query
  const {
    data: dataTagFeatured
  } = useQueryHelper({
    name: "get-tag-featured-dev-gd-office",
    gql: GET_TAG_FEATURED_DEVELOPMENTS,
    config: {
      enabled: useOfficeFeatured
    },
  });

  const { isLoading: isLoadingQuery, isFetching: isFetchingQuery, isError } = useQueryHelper({
    name: "get-agent-featured-listing-crm",
    gql: useOfficeFeatured ? GET_LISTING_FEATURED_DEVELOPMENTS_OFFICE : GET_AGENT_FEATURED_LISTING,
    config: {
      enabled: (useOfficeFeatured && !!(dataTagFeatured)) || (!useOfficeFeatured),
      onSuccess: (response) => {
        
        if(useOfficeFeatured) {
          const listings = formatResponseDataAdmin(response);
          setListingAgent(listings);
          setListingFeaturedAgent([]);
        } else {
          const listings = formatResponseData(response);
          const idListings = getArrayIdListings(listings);
          setListingFeaturedAgent(idListings);
          setListingAgent(listings);
        }
        
        setTimeout(() => {
          setIsSkeleton(false);
        }, 500);

      },
      onError: (e) => {
        setTimeout(() => {
          setIsSkeleton(false);
        }, 500);
      },
    },
    variables: {
      agentId: idAgent || databaseId,
      agentType: idAgent ? USER_ROLES_CRM.AGENT : agentType,
      tagId: ''+get(dataTagFeatured, ["tags", "nodes", "0", "databaseId"], 0)
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