import { useState } from "react";

// global store 
import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

import { useLocalStorage } from "@mantine/hooks";

import { useQueryHelper } from "../../GraphqlClient/useRequest";
import { GET_USER_BY_ID } from "../../GraphqlClient/user.gql";
import { GET_AGENT_PROFILE_INFO } from "../../GraphqlClient/agentProfile.gql";

import { DEFAULT_ROUTE } from "../../Route/routes";

import { LOCAL_STORAGE } from "../../Utils/globalConstants";

import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

const useVerifyRoute = () => {

  const { state: { user: { isLoadingFull } }, actions: { setLoadingFull, setInfoUser, setRoute, setLogout } } = useClientGlobalStore();

  const [userIdLocalStorage] = useLocalStorage({
    key: LOCAL_STORAGE.USER,
    defaultValue: null,
  });
  const [routeInLocalStorage] = useLocalStorage({
    key: LOCAL_STORAGE.ROUTE,
    defaultValue: DEFAULT_ROUTE,
  });

  const getUserResponse = (data) => {
    const hasRoles = !isEmpty(get(data, ["user", "roles"]));
    const hasUserName = get(data, ["user", "username"]);
    const hasId = get(data, ["user", "id"]);
    return !!(hasUserName && hasId && hasRoles);
  };

  const { data: dataUser } =useQueryHelper({
    name: "get-user-by-id-verify",
    gql: GET_USER_BY_ID,
    variables: {
      id: userIdLocalStorage,
    },
    config: {
      onSuccess: (response) => {
        const isLoginUser = getUserResponse(response);
        if (!isLoginUser)
          setLogout();
        
      },
      onError: (e) => { 
        setLogout();
      },
    },
  });

  useQueryHelper({
    name: "get-agent-verify-crm",
    gql: GET_AGENT_PROFILE_INFO,
    config: {
      enabled: getUserResponse(dataUser),
      onSuccess: (response) => {
        const infoAgent = get(response, ["dataAgent", "0"], null);
        if(!infoAgent)
          setLogout();

        setRoute(routeInLocalStorage);
        setInfoUser(infoAgent);

        setTimeout(() => {
          setLoadingFull(false);
        }, 700)
        
      },
      onError: (e) => {
        setLogout();
      },
    },
    variables: {
        agentId: get(dataUser, ["user", "databaseId"], null)
    },
});

  return {
    loadingVerify: isLoadingFull,
  };
};

export default useVerifyRoute;
