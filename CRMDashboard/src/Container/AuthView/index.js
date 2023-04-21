import React, { useState } from "react";
// import { getAgentTypeByRole } from "../../GlobalStore/useActionsUser"; 
import { USER_ROLES_CRM } from "../../GlobalStore/utils";
import { useQueryHelper } from "../../GraphqlClient/hooks/useRequest";
import { GET_AGENT_PROFILE_INFO } from "../../GraphqlClient/agentProfile.gql";

import Login from "./Login";

import { useLocalStorage } from "@mantine/hooks";
import { LOCAL_STORAGE } from "../../Utils/globalConstants";
import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";
import { DEFAULT_ROUTE, ROUTES_NAMES } from "../../Route/routes";


import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import toLower from 'lodash/toLower';

const AuthContainer = () => {

  const { state: { global: { route: routeInStore } }, actions: { setLogout, setInfoUser, setRoute } } = useClientGlobalStore();
  const [infoUserLogin, setInfoUserLogin] = useState(null);

  const getAgentTypeByRole = () => {
    /* 
      Query UserById = roles: { nodes: array[] }
    */
    let userRol = toLower(get(infoUserLogin, ["roles", "nodes", "0", "displayName"], USER_ROLES_CRM.AGENT));
    return (userRol === "administrator") ? USER_ROLES_CRM.ADMIN : USER_ROLES_CRM.AGENT;
  }

  // set avatarprofile and other data of user after the login
  useQueryHelper({
    name: "get-agent-verify-crm-login",
    gql: GET_AGENT_PROFILE_INFO,
    config: {
      enabled: !!(infoUserLogin),
      onSuccess: (response) => {
        const infoAgent = get(response, ["dataAgent", "0"], null);
        if (infoAgent && (routeInStore === ROUTES_NAMES.AUTH || !routeInStore)) {
          setInfoUser(infoAgent);
          setRouteInLocalStorage(DEFAULT_ROUTE);
          setRoute(DEFAULT_ROUTE);
        } else {
          setLogout();
        }
      },
      onError: () => {
        setLogout();
      }
    },
    variables: {
      agentId: get(infoUserLogin, ["databaseId"]),
      agentType: getAgentTypeByRole()
    },
  });

  const [, setIdLocalStorage] = useLocalStorage({
    key: LOCAL_STORAGE.USER,
    defaultValue: null,
  });
  const [, setRouteInLocalStorage] = useLocalStorage({
    key: LOCAL_STORAGE.ROUTE,
    defaultValue: DEFAULT_ROUTE,
  });
  const [, setTokenLocal] = useLocalStorage({
    key: LOCAL_STORAGE.TOKEN,
    defaultValue: null,
  });
  const [, setRefreshTokenLocal] = useLocalStorage({
    key: LOCAL_STORAGE.REFRESH,
    defaultValue: null,
  });

  const isLoginResponse = (data) => {
    const hasRoles = !isEmpty(get(data, ["login", "user", "roles"]));
    const hasUserName = get(data, ["login", "user", "username"]);
    const hasId = get(data, ["login", "user", "id"]);
    return hasRoles && hasUserName && hasId;
  };

  const onSuccessLogin = (response) => {
    const getToken = get(response, ["login", "authToken"]);
    const getRefresh = get(response, ["login", "refreshToken"]);
    const getUser = get(response, ["login", "user"]);
    const isLogin = isLoginResponse(response);

    if (isLogin && getToken) {
      // force to fetch query dataAgent
      setInfoUserLogin(getUser);

      setRefreshTokenLocal(getRefresh);
      setTokenLocal(getToken);
      setIdLocalStorage(getUser.id);

    } else {
      setLogout();
    }

  };

  return <Login onSuccessLogin={onSuccessLogin} />;
};

export default AuthContainer;
