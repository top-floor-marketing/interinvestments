import { memo } from 'react';
import { Box, createStyles, Paper, Text, LoadingOverlay } from "@mantine/core";
import { DatabaseOff } from "tabler-icons-react";
import SpringDiv from "../../Component/SpringDiv";

import SkeletonLeads from "./skeletonLeads";
import FilterOptions from "./filterOptions";
import { LeadsVirtual } from "../../Component/VirtualListContainer";
import useGetLeads from "./hooks/useGetLeads";

const useStyles = createStyles((theme, _params) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
  },
  containerListings: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative"
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

  const { isSkeleton, isAdminLeadView,  isLoading, selectStateProps, searchProps, totalData, allLeads, refetch } =
    useGetLeads();

  return isSkeleton ? (
    <SkeletonLeads />
  ) : (
    <Box className={classes.container}>
      <SpringDiv delay={100} duration={300}>
        <FilterOptions
          isLoading={isLoading}
          searchProps={searchProps}
          refetch={refetch}
          selectStateProps={selectStateProps}
        />
      </SpringDiv>
      <SpringDiv delay={300} duration={300} fullHeight>
        <Paper className={classes.containerListings}>
          {isLoading && (
            <LoadingOverlay
              overlayOpacity={0.05}
              visible={isLoading}
              overlayBlur={0.05}
              overlayColor="#eaeae9"
              loaderProps={{ size: 'sm', color: '#ffb839', variant: 'bars' }}
            />
          )}
          {totalData && !isSkeleton ? (
            <LeadsVirtual
              isAdminLeadView={isAdminLeadView}
              data={allLeads}
              totalData={totalData}
              refetch={null}
              isLoading={isLoading}
            />
          ) : (
            <div className={classes.noData}>
              <Text component="h4">No data found</Text>
              <DatabaseOff size={36} />
            </div>
          )}
        </Paper>
      </SpringDiv>
    </Box>
  );
};

export default memo(LeadsView);
