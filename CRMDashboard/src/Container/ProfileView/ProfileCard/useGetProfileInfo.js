import { useState } from 'react';
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_AGENT_PROFILE_INFO } from "../../../GraphqlClient/agentProfile.gql";

// global Store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore';

import isEmpty from 'lodash/isEmpty';

const USER_ROLES = {
  ADMIN: 'MASTER',
  AGENT: 'AGENT',
}

const useGetProfileInfo = ({ idAgent }) => {

    const { 
      state: { user: { infoUser: { databaseId, agentType } } },
      actions: { setInfoUser }
    }= useClientGlobalStore();

    const [dataAgent,setDataAgent] = useState(null);
    const [isSkeleton, setIsSkeleton] = useState(true);

    const formatResponseData = (nextData) => {
      const { dataAgent } = nextData;
      if(!isEmpty(dataAgent)) {
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
            // idAgent prop is for component in a modal
            if(!idAgent)
              setInfoUser(data);
          },
          onError: (e) => {
            setIsSkeleton(false);
          },
        },
        variables: {
            agentId: idAgent || databaseId,
            agentType: idAgent ? USER_ROLES.AGENT : agentType
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