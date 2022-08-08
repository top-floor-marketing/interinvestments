import { useState } from "react";

// global store 
import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

import { useLocalStorage } from "@mantine/hooks";

import { useQueryHelper } from "../../GraphqlClient/useRequest";
import { GET_USER_BY_ID } from "../../GraphqlClient/user.gql";

import { DEFAULT_ROUTE } from "../../Route/routes";

import { LOCAL_STORAGE } from "../../Utils/globalConstants";

import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

const useVerifyRoute = () => {

  const { actions: { setLoadingFull, setInfoUser, setRoute, setLogout } } = useClientGlobalStore();

  const [loadingVerify, setLoadingVerify] = useState(true);
  const [userIdLocalStorage] = useLocalStorage({
    key: LOCAL_STORAGE.USER,
    defaultValue: null,
  });
  const [routeInLocalStorage] = useLocalStorage({
    key: LOCAL_STORAGE.ROUTE,
    defaultValue: DEFAULT_ROUTE,
  });

  const isLoadingResponse = (data) => {
    const hasRoles = !isEmpty(get(data, ["user", "roles"]));
    const hasUserName = get(data, ["user", "username"]);
    const hasId = get(data, ["user", "id"]);
    return !!(hasUserName && hasId && hasRoles);
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
        if (!isLoginUser) {
          setLoadingVerify(false);
          setLogout();
        }

        setInfoUser(get(response, ["user"]));
        setRoute(routeInLocalStorage);

        setLoadingFull(false);
        setLoadingVerify(false);

      },
      onError: (e) => {
        setLoadingVerify(false);
        setLogout();
      },
    },
  });

  return {
    loadingVerify: loadingVerify || isLoading || isFetching,
  };
};

export default useVerifyRoute;
