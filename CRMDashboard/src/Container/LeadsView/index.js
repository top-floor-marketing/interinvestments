import { Box, createStyles, Paper, Text, LoadingOverlay } from "@mantine/core";
import { DatabaseOff } from "tabler-icons-react";
import SpringDiv from "../../Component/SpringDiv";

import SkeletonLeads from "./skeletonLeads";

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
    position: "relative",
    ".mantine-Overlay-root": {
      borderRadius: "10px !important",
    },
  },
  containerListings: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  virtualAllListings: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  noData: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    padding: theme.other.spacing.p8,
  },
}));

const LeadsView = () => {
  const { classes } = useStyles();

  return <SkeletonLeads />;
};

export default LeadsView;
