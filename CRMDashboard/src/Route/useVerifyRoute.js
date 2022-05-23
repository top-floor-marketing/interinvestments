import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { toggleLoadingFull } from "../Store/userSlice";
import { useLocalStorage } from "@mantine/hooks";

import { CRM_ROUTES } from "./routes";

import filter from "lodash/filter";

import { useQueryHelper } from "../GraphqlClient/useRequest";
import { GET_USER_BY_ID_GQL } from "./gql";

import { LOCAL_STORAGE } from "../Utils/globalConstants";
const useVerifyRoute = () => {
  const [routeValidate, setRouteValidate] = useState(false);
  const [loadingFirtsMount, setLoadingFirtsMount] = useState(true);
  const { route } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const routeActive = filter(CRM_ROUTES, (o) => {
    return o.name === route;
  });

  const [tokenLocal, setTokenLocal] = useLocalStorage({
    key: LOCAL_STORAGE.TOKEN,
    defaultValue: null,
  });
  const [userIdLocal, setIdLocal] = useLocalStorage({
    key: LOCAL_STORAGE.USER,
    defaultValue: null,
  });
  const [refreshTokenLocal, setRefreshTokenLocal] = useLocalStorage({
    key: LOCAL_STORAGE.REFRESH,
    defaultValue: null,
  });

  const {
    loading: loadingGetUser,
    error: errorGetUser,
    data: dataGetUser,
    isFetching: isFetchingGetUser,
  } = useQueryHelper({
    name: "getUserById",
    gql: GET_USER_BY_ID_GQL,
    variables: {
      id: userIdLocal,
    },
    config: {
      enabled: !!route,
      onSuccess: (data) => {
        console.log("data", data);
      },
      onError: (error) => {
        console.log("error", error);
      },
    },
  });

  useEffect(() => {
    if (loadingFirtsMount) {
      dispatch(toggleLoadingFull(true));
      dispatch(toggleLoadingFull(false));
      setLoadingFirtsMount(false);
    }
  }, [dispatch, loadingFirtsMount, route]);

  return {
    loadingFirtsMount,
    routeActive: routeActive.length ? routeActive[0] : null,
    routeValidate,
  };
};

export default useVerifyRoute;
