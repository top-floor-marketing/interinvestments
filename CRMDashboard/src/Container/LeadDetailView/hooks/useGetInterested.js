import { useState } from "react";
import { useQueryHelper } from "../../../GraphqlClient/hooks/useRequest";
import { GET_LEAD_INTERESTED } from "../../../GraphqlClient/leads.gql";

import { get, forEach } from "lodash";

const useGetInterested = ({ idAgent, idLead }) => {

  const [dataInterested, setDataInterested] = useState(null);

  const { isLoading, refetch, isFetched } = useQueryHelper({
    name: `get-interested-lead_${idAgent}_${idLead}`,
    gql: GET_LEAD_INTERESTED,
    config: {
      onSuccess: (response) => {
        const getResponse = get(response, ["dataAgent", "0", "leads", "nodes"], []);
        let serviceList = [];
        let listingList = [];
        forEach(getResponse, (val) => {
            const getRelation = get(val, ["leads"], null);
            if (getRelation?.relationshipService) {
                serviceList = [...serviceList].concat(getRelation?.relationshipService);
            } else if (getRelation?.relationshipWithListing) {
                listingList = [...listingList].concat(
                  getRelation?.relationshipWithListing
                );
            }
        });
        setDataInterested({
          serviceList,
          listingList,
        });
      },
      onerror: () => {
      },
    },
    variables: {
      agentId: idLead,
      leadByAgentId: idAgent,
    },
  });

  return {
    isLoading,
    refetch,
    isSkeleton: isLoading && !isFetched,
    dataInterested,
  };
};

export default useGetInterested;
