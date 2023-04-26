import { useState } from 'react';
// react-query
import { useQueryHelper } from '../../../GraphqlClient/useRequest';
import { PIPELINE } from '../../../GraphqlClient/pipeline.gql';

import dayjs from 'dayjs';

import get from 'lodash/get';
import reduce from 'lodash/reduce';
import { toLower } from 'lodash';

const useGetPipelineLeads = ({ agentId, statusId, agentSelected }) => {
  const [dataPipeline, setDataPipeline] = useState([]);

  const { isLoading, isError, refetch } = useQueryHelper({
    name: [`PIPELINE_${agentId}_${statusId}`, agentId, statusId],
    gql: PIPELINE,
    variables: {
      agentId: agentId,
      statusId: statusId,
    },
    config: {
      enabled: agentId > 0,
      onSuccess: (response) => {
        const getData = get(response, ['pipeline'], []);
        const addAgentId = reduce(
          getData,
          (acc, val) => {
            if (!val?.firstName && !val?.lastName) return acc;

            if (
              toLower(val?.firstName) === 'firstname' ||
              toLower(val?.lastName) === 'lastname'
            )
              return acc;
            return [
              ...acc,
              {
                ...val,
                date: dayjs(val?.date),
                "date222":val?.date,
                agentId,
                agentAvatar: get(agentSelected, ['avatarProfile'], null),
                agentEmail: get(agentSelected, ['email'], null),
                agentFullName: get(agentSelected, ['firstName'], '')
                  .concat(' ')
                  .concat(get(agentSelected, ['lastName'], '')),
              },
            ];
          },
          []
        );
        setDataPipeline(addAgentId);
      },
      onError: () => {
        setDataPipeline([]);
      },
    },
  });

  return {
    isLoading: agentId === null ? false : isLoading,
    isError,
    data: agentId > 0 ? dataPipeline : [],
    refetch,
  };
};

export default useGetPipelineLeads;
