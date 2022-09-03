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

  const [allLeads, setAllLeads] = useState(null);
  const [isOverlay, setIsOverlay] = useState(false);
  const [isLoadingListing, setIsLoadingListing] = useState(true);

  // filters values
  const [searchText, setSearchText] = useState("");

   const onChangeSearchText = (e) => {
     setSearchText(e.currentTarget.value);
   };

  const { isLoading: isLoadingLeads, isError: isErrorLeads } = useQueryHelper({
    name: "get-leads_list_agent",
    gql: GET_LEADS_LIST_FOR_AGENT,
    config: {
      onSuccess: (response) => {
        console.log("Response ", response)
      },
    },
    variables: {
      agentId: databaseId,
      agentType: agentType,
    },
  });

  return {
    isSkeleton: isLoadingLeads || null,
    isLoading: isLoadingLeads || isOverlay,
    isOverlay,
    isError: isErrorLeads,
    searchProps: {
      onChange: onChangeSearchText,
      value: searchText,
    },
  };

};

export default useGetLeads;
