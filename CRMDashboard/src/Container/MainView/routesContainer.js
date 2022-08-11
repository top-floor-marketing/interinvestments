import { useCallback } from "react";
import { Box, createStyles } from "@mantine/core";
import React from "react";

import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";
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

  const { state: { user: { route: routeInStore } } } = useClientGlobalStore();

  const routeActive = filter(CRM_ROUTES, (o) => {
    return o.name === routeInStore;
  });

  const activeRoute = useCallback(get(routeActive, ["0"], []), [routeInStore]);

  return (
    <Box className={classes.mainContainer}>
      {
        (isEmpty(activeRoute))
          ? <NotFound404 />
          : (activeRoute.layout === LAYOUT_NAMES.DASHBOARD) ?
            <DashboardLayout>{activeRoute.component()}</DashboardLayout>
            : activeRoute.component()
      }
    </Box>
  );
};

const memoContainerMain = React.memo(RoutesContainer);

export default memoContainerMain;
