import { memo } from 'react';
import { Box, createStyles, Text, LoadingOverlay, Paper } from "@mantine/core";
import SpringDiv from "../../Component/SpringDiv";
import { DatabaseOff } from "tabler-icons-react";
import SkeletonAgents from './skeletonAgents';
import GridAgents from './gridAgents';
import PaperFilterAgents from './paperFilterAgents';

import useGetAllAgents from './hooks/useGetAllAgents';

const useStyles = createStyles((theme, _params) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
  },
  containerListings: {
    gap: theme.other.spacing.p4,
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
    height: "200px",
    alignItems: "center",
    padding: theme.other.spacing.p8,
  },
}));

const AgentsView = () => {
  const { classes } = useStyles();

  const { isLoading, isSkeleton, allAgents, totalData, searchProps } = useGetAllAgents();

  return isSkeleton ? (
    <SkeletonAgents />
  ) : (
    <Box className={classes.container}>
      <SpringDiv delay={300} duration={300}>
        <PaperFilterAgents searchProps={searchProps} isLoading={isLoading} />
      </SpringDiv>
      <SpringDiv delay={300} duration={300} fullHeight>
        <Box className={classes.containerListings}>
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
            <>
              <GridAgents
                data={allAgents}
              />
            </>
          ) : (
            <Paper className={classes.noData}>
              <Text component="h4">No data found</Text>
              <DatabaseOff size={36} />
            </Paper>
          )}
        </Box>
      </SpringDiv>
    </Box>
  );
};

export default memo(AgentsView);
