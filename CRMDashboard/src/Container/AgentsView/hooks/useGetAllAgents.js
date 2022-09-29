import { useState } from "react";
import {
  useQueryHelper,
} from "../../../GraphqlClient/useRequest";
import { ADMIN_GET_ALL_AGENTS } from "../../../GraphqlClient/agentProfile.gql";

import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

const useGetAllAgents = () => {
  const {
    state: {
      user: {
        infoUser: { databaseId, agentType },
      },
    },
  } = useClientGlobalStore();

  const [allAgents, setAllAgents] = useState([]);
  const [agentsFiltered, setAgentsFiltered] = useState([]);
  const [isOverlay, setIsOverlay] = useState(true);

  // filters values
  const [searchText, setSearchText] = useState("");

   const onChangeSearchText = (e) => {
     setIsOverlay(true);
     setSearchText(e.currentTarget.value);
    // setLeadsFiltered(filterByText(e.currentTarget.value, dataOtherFilter));
     setIsOverlay(false);
   };

  const { isLoading: isLoadingAgents, isError: isErrorAgents, isSuccess: isSuccessAgents, refetch } = useQueryHelper({
    name: "admin-get-all-agents",
    gql: ADMIN_GET_ALL_AGENTS,
    config: {
      onSuccess: (response) => {
        console.log('response ', response);
        //setAllLeads(formatReponseLeads(response));
        setIsOverlay(false);
      },
      onerror: () => {
        setIsOverlay(false);
      }
    },
  });

  return {
    isSkeleton: isLoadingAgents && isOverlay && !isSuccessAgents,
    isLoading: isLoadingAgents || isOverlay,
    isError: isErrorAgents,
  }

/*   return {
    isSkeleton: isLoadingLeads && isOverlay && !isSuccessLeads,
    isLoading: isLoadingLeads || isOverlay,
    isError: isErrorLeads,
    searchProps: {
      onChange: (e) => onChangeSearchText(e),
      value: searchText,
    },
    selectStateProps: {
      onChange: (e) => onChangeStateFilter(e),
      value: filterState,
    },
    allLeads: (searchText || filterState) ? leadsFiltered : allLeads,
    totalData: (searchText || filterState) ? leadsFiltered.length : allLeads.length,
    refetch
  }; */

};

export default useGetAllAgents;
