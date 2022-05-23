import { Box, createStyles } from "@mantine/core";
import React from "react";

import NotFound404 from "../Component/NotFound404";

import useVerifyRoute from "../Route/useVerifyRoute";

const useStyles = createStyles((theme, _params, getRef) => ({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "flex-column",
    minHeight: "100vh",
    backgroundColor: theme.colors.gray[0],
    justifyContent: "center",
    alignContent: "center",
  },
}));

const ContainerMain = () => {
  const { classes } = useStyles();

  const { loadingFirtsMount, routeActive, routeValidate } = useVerifyRoute();

  if (loadingFirtsMount) {
    return null;
  }

  return (
    <Box className={classes.mainContainer}>
      {routeActive ? routeActive.component() : <NotFound404 />}
    </Box>
  );
};

const memoContainerMain = React.memo(ContainerMain);

export default memoContainerMain;
