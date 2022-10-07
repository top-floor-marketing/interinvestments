import { useState } from 'react'
// react-query
import { useQueryHelper } from '../../../GraphqlClient/useRequest'
import { PIPELINE } from '../../../GraphqlClient/pipeline.gql';

import get from 'lodash/get';
import map from 'lodash/map';

const useGetPipelineLeads = ({agentId, statusId}) => {
    const [dataPipeline, setDataPipeline] = useState([])

    const { isLoading, isError, refetch }  = useQueryHelper({
        name: `PIPELINE_${agentId}_${statusId}`,
        gql: PIPELINE,
        variables: {
            agentId: agentId,
            statusId: statusId
        },
        config: {
            enabled: (agentId > 0),
            onSuccess: (response) => {
                const getData = get(response, ["pipeline"], []);
                const addAgentId = map(getData, (val) => ({...val, agentId}));
                setDataPipeline(addAgentId);
            },
            onError: () => {
                setDataPipeline([]);
            }
        }
    });

    return {
        isLoading: (agentId === null) ? false : isLoading,
        isError,
        data: agentId > 0 ? dataPipeline : [],
        refetch
    }

}

export default useGetPipelineLeads