import { Box, createStyles } from "@mantine/core";
import React from "react";

import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";
import useGetGlobalData from "./useGetGlobalData";

import { CRM_ROUTES, LAYOUT_NAMES } from "../../Route/routes";

import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import get from 'lodash/get';

// layouts
import { DashboardLayout } from "../../Layout";

// components
import NotFound404 from "../../Component/NotFound404";

const useStyles = createStyles((theme, _params) => ({
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

  const { state: { global: { route: routeInStore } } } = useClientGlobalStore();
  useGetGlobalData();

  const routeActive = get(filter(CRM_ROUTES, (o) => {
    return o.name === routeInStore;
  }), ["0"], []);

  return (
    <Box className={classes.mainContainer}>
      {isEmpty(routeActive) ? (
        <NotFound404 />
      ) : routeActive.layout === LAYOUT_NAMES.DASHBOARD ? (
        <DashboardLayout>{routeActive.component()}</DashboardLayout>
      ) : (
        routeActive.component()
      )}
    </Box>
  );
};

const memoContainerMain = React.memo(RoutesContainer);

export default memoContainerMain;
