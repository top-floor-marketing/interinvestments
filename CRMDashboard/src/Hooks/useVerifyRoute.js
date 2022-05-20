import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { toggleLoadingFull } from "../Store/userSlice";
import { useLocalStorage } from "@mantine/hooks";

import { CRM_ROUTES } from "../Route/routes";

import filter from "lodash/filter";

const useVerifyRoute = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loadingFirtsMount, setLoadingFirtsMount] = useState(true);
  const { route } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const routeActive = filter(CRM_ROUTES, (o) => {
    return o.name === route;
  });

  const [token, setToken] = useLocalStorage({
    key: "crm-token",
    defaultValue: null,
  });
  const [refreshToken, setRefreshToken] = useLocalStorage({
    key: "crm-refresh-token",
    defaultValue: null,
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
  };
};

export default useVerifyRoute;
