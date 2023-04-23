import { Box, createStyles } from "@mantine/core";
import React from "react";

import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

// HOC auth
import withAutentication from "../../Component/WithAutentication";

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

const MainView = () => {

  const { classes } = useStyles();

  const { state: { global: { route: routeInStore }, user } } = useClientGlobalStore();

  const routeActive = get(filter(CRM_ROUTES, (o) => {
    return o.name === routeInStore;
  }), ["0"], []);

  const agentType = get(user, ["infoUser", "agentType"], null);
  const viewValid = isEmpty(routeActive) ? false : (routeActive?.roles?.length === 0 || routeActive?.roles?.includes(agentType));

  return (
    <Box className={classes.mainContainer}>
        {isEmpty(routeActive) || !viewValid ? (
        <NotFound404 />
      ) : routeActive.layout === LAYOUT_NAMES.DASHBOARD ? (
        <DashboardLayout>{routeActive.component()}</DashboardLayout>
      ) : (
        routeActive.component()
      )}
    </Box>
  )
};

const memoContainerMain = React.memo(MainView);

export default withAutentication(memoContainerMain);
