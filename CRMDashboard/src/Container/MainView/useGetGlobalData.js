import { useState, useCallback } from 'react';
// global store
import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

import { useQueryHelper } from "../../GraphqlClient/useRequest";

import { GET_STATUS_USER_LEADS } from "../../GraphqlClient/userLeads.gql";

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
      case "not contacted":
        return "error";
      case "contacted":
        return "primary";
      case "showing":
        return "secondary";
      case "contract":
        return "success";
      case "ask referrals":
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

        const arrayState = ["not contacted", "contacted", "showing", "contract", "ask referrals"];

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
        }, 200)
      },
    },
  });

  return {
    finishSetStatus
  }
};

export default useGetGlobalData;
