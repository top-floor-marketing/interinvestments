import React from "react";

import useVerifyUserIsLogin from "./useVerifyUserIsLogin";

import LoadingFull from "../../Component/LoadingFull";

import RoutesContainer from "./routesContainer";

const ContainerCRM = () => {
  const { loadingVerify } = useVerifyUserIsLogin();
  return loadingVerify ? (
    <LoadingFull isLoadingLazy idLazy="ContainerCRM" />
  ) : (
    <RoutesContainer />
  ); 
};

const memoContainerMain = React.memo(ContainerCRM);

export default memoContainerMain;
