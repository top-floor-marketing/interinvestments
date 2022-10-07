import { useState, useCallback } from 'react';
// global store
import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

import { useQueryHelper } from "../../GraphqlClient/useRequest";

import { GET_STATUS_USER_LEADS } from "../../GraphqlClient/userLeads.gql";

import { PIPELINE_STATUS } from '../../GlobalStore/utils';

import get from "lodash/get";
import findLast from 'lodash/findLast';
import toLower from 'lodash/toLower';

const useGetGlobalData = () => {
  const {
    actions: { setStatusUserLead },
  } = useClientGlobalStore();

  const [finishSetStatus, setFinishSetStatus] = useState(false);

  const getColorItem = useCallback((label) => {
    switch (toLower(label)) {
      case PIPELINE_STATUS.NOT_CONTACTED:
        return "error";
      case PIPELINE_STATUS.CONTACTED:
        return "primary";
      case PIPELINE_STATUS.SHOWING:
        return "secondary";
      case PIPELINE_STATUS.CONTRACT:
        return "success";
      case PIPELINE_STATUS.ASK_REFERRALS:
        return "info";
      default:
        return "";
    }
  }, []);

  useQueryHelper({
    name: "get-status-user-leads",
    gql: GET_STATUS_USER_LEADS,
    config: {
      onSuccess: (response) => {
        const listStatus = get(response, ["statuses", "nodes"], []);
        const dataForSelect = listStatus.map((val) => ({ value: val.databaseId, label: val.name }));

        const arrayState = [PIPELINE_STATUS.NOT_CONTACTED, PIPELINE_STATUS.CONTACTED, PIPELINE_STATUS.SHOWING, PIPELINE_STATUS.CONTRACT, PIPELINE_STATUS.ASK_REFERRALS];

        const dataOrder = arrayState.map((val) => {
          const findByLabel = findLast(dataForSelect, (i) => (toLower(i.label) === toLower(val)))
          return {
            ...findByLabel,
            color: getColorItem(findByLabel?.label)
          }
        })

        setStatusUserLead(dataOrder);
        setTimeout(() => {
          setFinishSetStatus(true);
        }, 200);
        
      },
    },
  });

  return {
    finishSetStatus
  }
};

export default useGetGlobalData;
