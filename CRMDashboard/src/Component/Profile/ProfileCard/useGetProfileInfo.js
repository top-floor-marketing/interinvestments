import { useState } from 'react';
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_AGENT_INFO } from "../../../GraphqlClient/agentProfile.gql";

// global Store
import { useSelector } from "react-redux";

// lodash
import get from 'lodash/get';
import random from 'lodash/random';

const useGetProfileInfo = () => {

    const { infoUser: { databaseId } } = useSelector((state) => state.user);

    const [dataAgent,setDataAgent] = useState(null);
    const [isSkeleton, setIsSkeleton] = useState(true);

    const formatResponseData = (nextData) => {
      const { dataAgent } = nextData;
      if(dataAgent.length) {
        return {
          ...dataAgent[0]
        }
      }
      return null;
    }

    const { isLoading: isLoadingQuery, isFetching: isFetchingQuery, isError, refetch } = useQueryHelper({
        name: "get-agent-info-crm",
        gql: GET_AGENT_INFO,
        config: {
          onSuccess: (response) => {
            setIsSkeleton(false);
            setDataAgent(formatResponseData(response));
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
        dataAgent,
        refetchData: refetch
    }
}

export default useGetProfileInfo;