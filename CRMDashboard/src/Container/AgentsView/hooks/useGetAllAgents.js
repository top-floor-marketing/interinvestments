import { useState } from "react";
import { useDebouncedState } from '@mantine/hooks';
import {
  useQueryHelper,
} from "../../../GraphqlClient/useRequest";
import { ADMIN_GET_ALL_AGENTS } from "../../../GraphqlClient/agentProfile.gql";

import { orderAgentByName, filterByText } from "./utils.service";
import get from 'lodash/get';

const useGetAllAgents = () => {

  const [allAgents, setAllAgents] = useState([]);
  const [agentsFiltered, setAgentsFiltered] = useState([]);
  const [isOverlay, setIsOverlay] = useState(true);

  // filters values
  const [searchText, setSearchText] = useDebouncedState('', 700);

   const onChangeSearchText = (e) => {
     setIsOverlay(true);
     setSearchText(e.currentTarget.value);
     setAgentsFiltered(filterByText(e.currentTarget.value, allAgents));
     setIsOverlay(false);
   };

  const { isLoading: isLoadingAgents, isError: isErrorAgents, isSuccess: isSuccessAgents, refetch } = useQueryHelper({
    name: "admin-get-all-agents",
    gql: ADMIN_GET_ALL_AGENTS,
    config: {
      onSuccess: (response) => {
        setAllAgents(orderAgentByName(get(response, ["dataAgent"], [])));
        setTimeout(() => {
          setIsOverlay(false);
        }, 1500);
      },
      onerror: () => {
        setAllAgents([]);
        setAgentsFiltered([]);
        setIsOverlay(false);
      }
    },
  });

  return {
    isSkeleton: isLoadingAgents && isOverlay && !isSuccessAgents,
    isLoading: isLoadingAgents || isOverlay,
    isError: isErrorAgents,
    searchProps: {
      onChange: (e) => onChangeSearchText(e),
      value: searchText,
    },
    allAgents: (searchText) ? agentsFiltered : allAgents,
    totalData: (searchText) ? agentsFiltered.length : allAgents.length,
    refetch
  }

};

export default useGetAllAgents;
