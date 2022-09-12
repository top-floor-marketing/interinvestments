import { useState } from "react";
import {
  useQueryHelper,
} from "../../../GraphqlClient/useRequest";
import { GET_INFO_LEAD_BY_AGENT } from "../../../GraphqlClient/leads.gql";

import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import { LOCAL_STORAGE } from "../../../Utils/globalConstants";
import { get, omit, filter, isEmpty, findLast } from "lodash";

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

  const getColorForTimeLine = (idStatus) => {
    const timeline = findLast(statusUserLead, (val) => parseInt(val.value) === parseInt(idStatus));
    return {
      color: get(timeline, ["color"], ""),
      status: get(timeline, ["label"], ""),
    }
  }

  const { isLoading, isSuccess, refetch, isFetched } = useQueryHelper({
    name: "get-info_lead_by_agent",
    gql: GET_INFO_LEAD_BY_AGENT,
    config: {
      onSuccess: (response) => {
        const getInfoLead = get(response, ["historyCommentLead","0"], null)
        setDataLead(omit(getInfoLead, ["statuses"]));
        const commentState = filter(get(getInfoLead, ["statuses"], []), (val) => !isEmpty(val?.comments)).map((val, index) => {
          let timeLine = getColorForTimeLine(val?.status);
          return {
            ...val,
            timeline: {
              color: timeLine.color,
              status: timeLine.status
            }
          }
        });
        setAllComments(commentState);
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
