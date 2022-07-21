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
      return Array.from(Array(10), (index) => {
        const _number = random(1, 10100);
        return {
          imageUrl: "https://www.mashvisor.com/blog/wp-content/uploads/2018/04/bigstock-Row-Of-New-Suburban-Homes-55511546.jpg",
          name: "Astoria " + _number,
          neighborhood: "Downtown Miami" + _number,
          id: "id_" + _number,
          uri: "uri_" + _number,
          category: "New Homes " + _number,
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
            setListingAgent([...listingAgent, ...formatResponseData(response)]);
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