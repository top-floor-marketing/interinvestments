import React from "react";

import useVerifyRoute from "./useVerifyRoute";

import LoadingFull from "../../Component/LoadingFull";

import RoutesContainer from "./routesContainer";

const ContainerCRM = () => {
  const { loadingVerify } = useVerifyRoute();
  return loadingVerify ? (
    <LoadingFull isLoadingLazy idLazy="ContainerCRM" />
  ) : (
    <RoutesContainer />
  ); 
};

const memoContainerMain = React.memo(ContainerCRM);

export default memoContainerMain;
