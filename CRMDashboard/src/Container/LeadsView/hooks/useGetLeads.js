import { useState } from "react";
import {
  useQueryHelper,
} from "../../../GraphqlClient/useRequest";
import { GET_LEADS_LIST_FOR_AGENT } from "../../../GraphqlClient/leads.gql";
import { ALL_LEADS_PIPELINE } from "../../../GraphqlClient/pipeline.gql";

import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import { formatReponseSingleAgentLeads, formatResponseFullAgents, filterByState, filterByText } from "./utils.service";

import { USER_ROLES_CRM } from "../../../GlobalStore/utils";

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
    setTimeout(() => {
      setIsOverlay(false);
    }, 300)
  }

  const { isLoading: isLoadingLeads, isError: isErrorLeads, isSuccess: isSuccessLeads, refetch } = useQueryHelper({
    name: "get_leads_list_agent",
    gql: agentType === USER_ROLES_CRM.ADMIN ? ALL_LEADS_PIPELINE : GET_LEADS_LIST_FOR_AGENT,
    config: {
      onSuccess: (response) => {
        if (agentType === USER_ROLES_CRM.ADMIN)
          setAllLeads(formatResponseFullAgents(response));
        else
          setAllLeads(formatReponseSingleAgentLeads(response));

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
    refetch,
    isAdminLeadView: (agentType === USER_ROLES_CRM.ADMIN)
  };

};

export default useGetLeads;
