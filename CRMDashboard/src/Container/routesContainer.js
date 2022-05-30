import { Box, createStyles } from "@mantine/core";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { CRM_ROUTES, LAYOUT_NAMES } from "../Route/routes";

import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";

// layouts
import { DashboardLayout } from "../Layout";

// components
import NotFound404 from "../Component/NotFound404";

const useStyles = createStyles((theme, _params, getRef) => ({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: theme.colors.white[1],
    justifyContent: "center",
    alignContent: "center",
    ".mantine-Paper-root": {
      backgroundColor: theme.colors.white[0],
    },
    ".mantine-TextInput-input": {
      border: "1px solid #83837C",
      backgroundColor: theme.colors.white[0],
      color: "#000",
    },
  },
}));

const RoutesContainer = () => {
  const { classes } = useStyles();

  const { route: routeInStore } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
