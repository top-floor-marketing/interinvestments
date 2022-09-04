// global store
import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

import { useQueryHelper } from "../../GraphqlClient/useRequest";

import { GET_STATUS_USER_LEADS } from "../../GraphqlClient/userLeads.gql";

import get from "lodash/get";

const useGetGlobalData = () => {
  const {
    actions: { setStatusUserLead },
  } = useClientGlobalStore();

  useQueryHelper({
    name: "get-status-user-leads",
    gql: GET_STATUS_USER_LEADS,
    config: {
      onSuccess: (response) => {
       setStatusUserLead(get(response, ["statuses", "nodes"], []));
      },
    },
  });
};

export default useGetGlobalData;
