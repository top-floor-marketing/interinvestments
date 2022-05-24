import { Box, createStyles } from "@mantine/core";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { CRM_ROUTES } from "../Route/routes";

import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";

import NotFound404 from "../Component/NotFound404";

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

const RoutesContainer = () => {
  const { classes } = useStyles();

  const { route: routeInStore } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const routeActive = filter(CRM_ROUTES, (o) => {
    return o.name === routeInStore;
  });

  const RenderActive = ({ active }) => {
    return active.component();
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
