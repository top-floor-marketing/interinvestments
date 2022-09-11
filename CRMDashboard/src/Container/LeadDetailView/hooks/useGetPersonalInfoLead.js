import { useState } from "react";
import {
  useQueryHelper,
} from "../../../GraphqlClient/useRequest";
import { GET_INFO_LEAD_BY_AGENT } from "../../../GraphqlClient/leads.gql";

import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import { LOCAL_STORAGE } from "../../../Utils/globalConstants";
import { get, omit } from "lodash";

const useGetPersonalInfoLead = () => {
  const {
    state: {
      global: {
        statusUserLead
      }
    },
  } = useClientGlobalStore();

  const infoInLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.LEAD_DETAIL_ID));

  const [dataLead, setDataLead] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [isOverlay, setIsOverlay] = useState(true);

  const { isLoading, isSuccess, refetch, isFetched } = useQueryHelper({
    name: "get-info_lead_by_agent",
    gql: GET_INFO_LEAD_BY_AGENT,
    config: {
      onSuccess: (response) => {
        const getInfoLead = get(response, ["historyCommentLead","0"], null)
        setDataLead(omit(getInfoLead, ["statuses"]));
        setAllComments(get(getInfoLead, ["statuses"], []));
      },
      onerror: () => {
        setIsOverlay(false);
      }
    },
    variables: {
        agentId: get(infoInLocalStorage, ["idAgent"], -1),
        userLeadId: get(infoInLocalStorage, ["idLead"], -1),
    },
  });

  return {
    isLoading,
    isSuccess,
    refetch,
    isSkeleton: isLoading && isOverlay && !isFetched,
    dataLead,
    allComments
  };

};

export default useGetPersonalInfoLead;
