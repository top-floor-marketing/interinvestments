import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from "@mantine/hooks";

import { toggleLoadingFull } from "../Store/userSlice";

const useIsLogin = () => {
  const [isVerifyLogin, setIsVerifyLogin] = useState(true);
  const dispatch = useDispatch();
  const [token, setToken] = useLocalStorage({
    key: "crm-token",
    defaultValue: null,
  });
  const [refreshToken, setRefreshToken] = useLocalStorage({
    key: "crm-refresh-token",
    defaultValue: null,
  });

  useEffect(() => {
    dispatch(toggleLoadingFull(true));
    setTimeout(() => {
      dispatch(toggleLoadingFull(false));
      setIsVerifyLogin(false);
    }, 2000);
  }, [dispatch, isVerifyLogin]);

  return {
    isVerifyLogin,
  };
};

export default useIsLogin;
