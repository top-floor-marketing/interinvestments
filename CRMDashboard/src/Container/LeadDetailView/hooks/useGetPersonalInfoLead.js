import { useState } from "react";
import {
  useQueryHelper,
} from "../../../GraphqlClient/useRequest";
import { GET_INFO_LEAD_BY_AGENT } from "../../../GraphqlClient/leads.gql";

import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import { get, omit, filter, findLast, isNull } from "lodash";

const useGetPersonalInfoLead = ({ idAgent, idLead }) => {
  const {
    state: {
      global: {
        statusUserLead
      }
    },
  } = useClientGlobalStore();

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
    name: `get-info_lead_by_agent_${idAgent}`,
    gql: GET_INFO_LEAD_BY_AGENT,
    config: {
      onSuccess: (response) => {
        const getInfoLead = get(response, ["historyCommentLead","0"], null)
        setDataLead(omit(getInfoLead, ["statuses"]));
        const commentState = filter(
          get(getInfoLead, ["statuses"], []),
          (val) => !isNull(val?.comments)
        ).map((val) => {
          let timeLine = getColorForTimeLine(val?.status);
          return {
            ...val,
            timeline: {
              color: timeLine.color,
              status: timeLine.status,
            },
          };
        });
        setAllComments(commentState);
      },
      onerror: () => {
        setIsOverlay(false);
      }
    },
    variables: {
        agentId: idAgent,
        userLeadId: idLead,
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
