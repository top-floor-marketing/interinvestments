import { useState } from "react";
import {
  useQueryHelper,
  useMutationHelper,
} from "../../../GraphqlClient/useRequest";
import { GET_LEADS_LIST_FOR_AGENT } from "../../../GraphqlClient/leads.gql";

import {
  notificationSuccess,
  notificationError,
} from "../../../Component/Notifications";

import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

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
   };

   const onChangeStateFilter = (e) => {
    setIsOverlay(true);
    setFilterState(e);
   }

  const { isLoading: isLoadingLeads, isError: isErrorLeads, isFetched: isFechedLeads } = useQueryHelper({
    name: "get-leads_list_agent",
    gql: GET_LEADS_LIST_FOR_AGENT,
    config: {
      onSuccess: (response) => {
        console.log("Response ", response);
        setIsOverlay(false);
      },
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
