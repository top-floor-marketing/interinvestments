import React from "react";

import Login from "./Login";

import { useLocalStorage } from "@mantine/hooks";
import { LOCAL_STORAGE } from "../../Utils/globalConstants";

import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

import { DEFAULT_ROUTE, ROUTES_NAMES } from "../../Route/routes";

import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

const AuthContainer = ({ isModal = false }) => {

  const { state: { user: { route: routeInStore } }, actions: { setLogout, setInfoUser, setRoute } } = useClientGlobalStore();

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
      setInfoUser(getUser);
      setRefreshTokenLocal(getRefresh);
      setTokenLocal(getToken);
      setIdLocalStorage(getUser.id);
      if (routeInStore === ROUTES_NAMES.AUTH || !routeInStore) {
        setRouteInLocalStorage(DEFAULT_ROUTE);
        setRoute(DEFAULT_ROUTE);
      }
    } else {
      setLogout();
    }
  };

  return <Login onSuccessLogin={onSuccessLogin} />;
};

export default AuthContainer;
