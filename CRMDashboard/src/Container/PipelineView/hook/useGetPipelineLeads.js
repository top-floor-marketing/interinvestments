import { useState } from 'react'
// react-query
import { useQueryHelper } from '../../../GraphqlClient/useRequest'
import { PIPELINE } from '../../../GraphqlClient/pipeline.gql';

import get from 'lodash/get';
import map from 'lodash/map';

const useGetPipelineLeads = ({agentId, statusId}) => {
    const [dataPipeline, setDataPipeline] = useState([])

    const { data, isLoading, isError, refetch }  = useQueryHelper({
        name: `PIPELINE_${agentId}_${statusId}`,
        gql: PIPELINE,
        variables: {
            agentId: agentId,
            statusId: statusId
        },
        config: {
            onSuccess: (response) => {
                const getData = get(response, ["pipeline"], []);
                const addAgentId = map(getData, (val) => ({...val, agentId}));
                setDataPipeline(addAgentId);
            },
        }
    });

    return {
        isLoading,
        isError,
        data: dataPipeline,
        refetch
    }

}

export default useGetPipelineLeads