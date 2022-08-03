import { Box, createStyles } from "@mantine/core";
import React from "react";

import { useSelector } from "react-redux";
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
/*     ".mantine-Skeleton-visible": {
      "&::before": {
        backgroundColor: theme.fn.rgba(theme.colors.gray[9], 1),
      },
      "&::after": {
        backgroundColor: theme.fn.rgba(theme.colors.gray[2], 0.7),
      },
    }, */
  },
}));

const RoutesContainer = () => {
  const { classes } = useStyles();
  const { route: routeInStore } = useSelector((state) => state.user);
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
