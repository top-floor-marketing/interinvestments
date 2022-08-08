import React from "react";

import useVerifyRoute from "./useVerifyRoute";

import RoutesContainer from "./routesContainer";

const ContainerCRM = () => {
  const { loadingVerify } = useVerifyRoute();
  return loadingVerify ? null : <RoutesContainer />; 
};

const memoContainerMain = React.memo(ContainerCRM);

export default memoContainerMain;
