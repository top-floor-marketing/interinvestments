import { useState } from "react";

import { useDispatch } from "react-redux";
import { toggleLoadingFull, setInfoUser, setRoute } from "../../Store/userSlice";
import { useLocalStorage } from "@mantine/hooks";

import { useQueryHelper } from "../../GraphqlClient/useRequest";
import { GET_USER_BY_ID } from "../../GraphqlClient/user.gql";

import { DEFAULT_ROUTE, ROUTES_NAMES } from "../../Route/routes";

import { LOCAL_STORAGE } from "../../Utils/globalConstants";

import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

const useVerifyRoute = () => {
  const [loadingVerify, setLoadingVerify] = useState(true);
  const dispatch = useDispatch();

  const [userIdLocalStorage, setIdLocalStorage] = useLocalStorage({
    key: LOCAL_STORAGE.USER,
    defaultValue: null,
  });
  const [routeInLocalStorage, setRouteInLocalStorage] = useLocalStorage({
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

  const isLoadingResponse = (data) => {
    const hasRoles = !isEmpty(get(data, ["user", "roles"]));
    const hasUserName = get(data, ["user", "username"]);
    const hasId = get(data, ["user", "id"]);
    return !!(hasUserName && hasId && hasRoles);
  };

  const setNullStore = () => {
    // localStorage set null
    setRefreshTokenLocal(null);
    setTokenLocal(null);
    setRouteInLocalStorage(ROUTES_NAMES.AUTH);
    setIdLocalStorage(null);

    // userSlice store set null
    dispatch(setInfoUser(null));
    // set AUTH Route for render Login Component
    dispatch(setRoute(ROUTES_NAMES.AUTH));
  };

  const { isLoading, isFetching } = useQueryHelper({
    name: "get-user-by-id-verify",
    gql: GET_USER_BY_ID,
    variables: {
      id: userIdLocalStorage,
    },
    config: {
      onSuccess: (response) => {
        const isLoginUser = isLoadingResponse(response);
        if (isLoginUser) {
          dispatch(setInfoUser(get(response, ["user"])));
          dispatch(setRoute(routeInLocalStorage));
        } else {
          setNullStore();
        }
        dispatch(toggleLoadingFull(false));
        setLoadingVerify(false);
      },
      onError: (e) => {
        setNullStore();
        dispatch(toggleLoadingFull(false));
        setLoadingVerify(false);
      },
    },
  });

  return {
    loadingVerify: loadingVerify || isLoading || isFetching,
  };
};

export default useVerifyRoute;
