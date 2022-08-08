import { Box, createStyles } from "@mantine/core";
import React from "react";

import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";
import { CRM_ROUTES, LAYOUT_NAMES } from "../../Route/routes";

import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";

// layouts
import { DashboardLayout } from "../../Layout";

// components
import NotFound404 from "../../Component/NotFound404";

const useStyles = createStyles((theme, _params, getRef) => ({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: theme.fn.rgba(theme.colors.gray[0], 0.6),
    justifyContent: "center",
    alignContent: "center",
  },
}));

const RoutesContainer = () => {
  const { classes } = useStyles();

  const { state: { user: { route: routeInStore, infoUser } } } = useClientGlobalStore();

  const routeActive = filter(CRM_ROUTES, (o) => {
    return o.name === routeInStore;
  });

  const RenderActive = ({ active }) => {
    switch (active.layout) {
      case LAYOUT_NAMES.DASHBOARD:
        return <DashboardLayout>{active.component()}</DashboardLayout>;
      case LAYOUT_NAMES.EMPTY:
        return active.component();
      default:
        return active.component();
    }
  };

  return (
    <Box className={classes.mainContainer}>
      {isEmpty(routeActive) ? (
        <NotFound404 />
      ) : (
        <RenderActive active={routeActive[0]} />
      )}
    </Box>
  );
};

const memoContainerMain = React.memo(RoutesContainer);

export default memoContainerMain;
