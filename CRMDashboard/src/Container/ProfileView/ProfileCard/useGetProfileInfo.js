import { useState } from 'react';
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_AGENT_PROFILE_INFO } from "../../../GraphqlClient/agentProfile.gql";

// global Store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore';

import isEmpty from 'lodash/isEmpty';

import { USER_ROLES_CRM } from '../../../GlobalStore/utils';

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

    const _idAgent = idAgent || databaseId;
    const _agentType = idAgent ? USER_ROLES_CRM.AGENT : agentType;

    const { isLoading: isLoadingQuery, isFetching: isFetchingQuery, isError, refetch } = useQueryHelper({
        name: ["get-agent-info-crm", _idAgent, _agentType],
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
            agentId: _idAgent,
            agentType: _agentType
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