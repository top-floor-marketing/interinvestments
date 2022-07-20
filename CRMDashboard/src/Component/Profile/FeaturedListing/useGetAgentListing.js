import { useState } from 'react';
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_AGENT_PROFILE_INFO } from "../../../GraphqlClient/agentProfile.gql";

// global Store
import { useSelector } from "react-redux";

import random from 'lodash/random';


const useGetAgentListing = () => {

    const { infoUser: { databaseId } } = useSelector((state) => state.user);

    const [listingAgent,setListingAgent] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(true);

    const formatResponseData = (nextData) => {
      return Array.from(Array(100), (index) => {
        const _number = random(1, 10100);
        return {
          imageUrl: "imageUrl_" + _number,
          name: "name_" + _number,
          neighborhood: "neighborhood_" + _number,
          id: "id_" + _number,
          uri: "uri_" + _number,
          category: "category_" + _number,
        }
      })
      /* const { listingAgent } = nextData;
      if(listingAgent?.length) {
        return {
          ...listingAgent[0]
        }
      }
      return null; */
    }

    const { isLoading: isLoadingQuery, isFetching: isFetchingQuery, isError, refetch } = useQueryHelper({
        name: "get-agent-info-crm",
        gql: GET_AGENT_PROFILE_INFO,
        config: {
          onSuccess: (response) => {
            setIsSkeleton(false);
            if(isSkeleton) {
              setListingAgent([...listingAgent, ...formatResponseData(response)]);
              setIsSkeleton(false);
            }
            setIsSkeleton(false);
          },
          onError: (e) => {
            setIsSkeleton(false);
            console.log("e ", e);
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
        totalData: listingAgent ? listingAgent.length : 0, 
        refetchData: refetch
    }
}

export default useGetAgentListing;