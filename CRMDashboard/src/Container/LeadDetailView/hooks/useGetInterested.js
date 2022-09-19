import { useState } from "react";
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_LEAD_INTERESTED } from "../../../GraphqlClient/leads.gql";

import { LOCAL_STORAGE } from "../../../Utils/globalConstants";
import { get, forEach } from "lodash";

const useGetInterested = () => {

  const infoInLocalStorage = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.LEAD_DETAIL_ID)
  );

  const [dataInterested, setDataInterested] = useState(null);

  const { isLoading, refetch, isFetched } = useQueryHelper({
    name: "get-interested-lead",
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
        console.log("serviceList ", serviceList);
        console.log("listingList ", listingList);
      },
      onerror: () => {
      },
    },
    variables: {
      agentId: get(infoInLocalStorage, ["idLead"], -1),
      leadByAgentId: get(infoInLocalStorage, ["idAgent"], -1),
    },
  });

  return {
    isLoading,
    refetch,
    isSkeleton: isLoading && !isFetched,
    dataInterested,
    agentId: get(infoInLocalStorage, ["idAgent"], -1),
  };
};

export default useGetInterested;
