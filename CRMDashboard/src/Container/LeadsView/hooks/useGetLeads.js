import { useState } from "react";
import {
  useQueryHelper,
} from "../../../GraphqlClient/useRequest";
import { GET_LEADS_LIST_FOR_AGENT } from "../../../GraphqlClient/leads.gql";

import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import { formatReponseLeads, filterByState, filterByText } from "./utils.service";

const useGetLeads = () => {
  const {
    state: {
      user: {
        infoUser: { databaseId, agentType },
      },
      global: {
        statusUserLead
      }
    },
  } = useClientGlobalStore();

  const [allLeads, setAllLeads] = useState([]);
  const [leadsFiltered, setLeadsFiltered] = useState([]);
  const [isOverlay, setIsOverlay] = useState(true);

  // filters values
  const [searchText, setSearchText] = useState("");
  const [filterState, setFilterState] = useState(null);

   const onChangeSearchText = (e) => {
     setIsOverlay(true);
     setSearchText(e.currentTarget.value);
     const dataOtherFilter = (filterState) ? filterByState(filterState, allLeads, statusUserLead) : allLeads;
     setLeadsFiltered(filterByText(e.currentTarget.value, dataOtherFilter));
     setIsOverlay(false);
   };

   const onChangeStateFilter = (e) => {
    setIsOverlay(true);
    setFilterState(e);
    const dataOtherFilter = (searchText) ? filterByText(searchText, allLeads) : allLeads;
    setLeadsFiltered(filterByState(e, dataOtherFilter, statusUserLead));
    setTimeout(()=> {
      setIsOverlay(false);
    }, 300)
   }

  const { isLoading: isLoadingLeads, isError: isErrorLeads, isSuccess: isSuccessLeads } = useQueryHelper({
    name: "get-leads_list_agent",
    gql: GET_LEADS_LIST_FOR_AGENT,
    config: {
      onSuccess: (response) => {
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
  };

};

export default useGetLeads;
