import React, { Suspense } from "react";

import LoadingFull from "../LoadingFull";
import { Box } from "@mantine/core";

const LoginComponent = React.lazy(() => import("./Login"));

const AuthContainer = () => {
  return (
    <Box>
      <Suspense
        fallback={<LoadingFull idLazy={"LoginComponent"} isLoadingLazy />}
      >
        <LoginComponent />
      </Suspense>
    </Box>
  );
};

export default AuthContainer;
