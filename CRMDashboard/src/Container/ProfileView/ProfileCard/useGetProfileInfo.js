import { useState } from 'react';
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_AGENT_PROFILE_INFO } from "../../../GraphqlClient/agentProfile.gql";

// global Store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore';

const useGetProfileInfo = () => {

    const { state: { user: { infoUser: { id } } } }= useClientGlobalStore();

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
        gql: GET_AGENT_PROFILE_INFO,
        config: {
          onSuccess: (response) => {
            setIsSkeleton(false);
            const data = formatResponseData(response);
            setDataAgent(data);
          },
          onError: (e) => {
            setIsSkeleton(false);
          },
        },
        variables: {
            agentId: id
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