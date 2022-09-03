import { Box, createStyles, Paper, Text, LoadingOverlay } from "@mantine/core";
import { DatabaseOff } from "tabler-icons-react";
import SpringDiv from "../../Component/SpringDiv";

import SkeletonLeads from "./skeletonLeads";
import FilterOptions from "./filterOptions";
import useGetLeads from "./hooks/useGetLeads";

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

  const { isSkeleton, isLoading,searchProps, isError, isOverlay } = useGetLeads();

  return isSkeleton ? (
    <SkeletonLeads />
  ) : (
    <Box className={classes.container}>
      <LoadingOverlay
        overlayOpacity={0.05}
        visible={isOverlay}
        overlayBlur={0.05}
      />
      <SpringDiv delay={100} duration={300}>
        <FilterOptions
          isLoading={isLoading}
          searchProps={searchProps}
        />
      </SpringDiv>
    </Box>
  );
};

export default LeadsView;
