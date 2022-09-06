import { useState } from "react";
import {
  useQueryHelper,
} from "../../../GraphqlClient/useRequest";
import { GET_LEADS_LIST_FOR_AGENT } from "../../../GraphqlClient/leads.gql";

import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import { formatReponseLeads } from "./utils.service";

const useGetLeads = () => {
  const {
    state: {
      user: {
        infoUser: { databaseId, agentType },
      },
    },
  } = useClientGlobalStore();

  const [allLeads, setAllLeads] = useState([]);
  const [isOverlay, setIsOverlay] = useState(true);

  // filters values
  const [searchText, setSearchText] = useState("");
  const [filterState, setFilterState] = useState(null);

   const onChangeSearchText = (e) => {
     setIsOverlay(true);
     setSearchText(e.currentTarget.value);
     setIsOverlay(false);
   };

   const onChangeStateFilter = (e) => {
    setIsOverlay(true);
    setFilterState(e);
    setIsOverlay(false);
   }

  const { isLoading: isLoadingLeads, isError: isErrorLeads, isFetched: isFechedLeads } = useQueryHelper({
    name: "get-leads_list_agent",
    gql: GET_LEADS_LIST_FOR_AGENT,
    config: {
      onSuccess: (response) => {
        // statuses
        setAllLeads(formatReponseLeads(response));
        setIsOverlay(false);
      },
      onerror: () => {
        setIsOverlay(false);
      }
    },
    variables: {
      agentId: databaseId,
      agentType: agentType,
    },
  });

  return {
    isSkeleton: isLoadingLeads && !isFechedLeads && isOverlay,
    isLoading: isLoadingLeads || isOverlay,
    isError: isErrorLeads,
    searchProps: {
      onChange: onChangeSearchText,
      value: searchText,
    },
    selectStateProps: {
      onChange: onChangeStateFilter,
      value: filterState,
    },
    allLeads,
    totalData: allLeads.length,
  };

};

export default useGetLeads;
