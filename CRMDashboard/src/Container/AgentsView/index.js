import {memo} from 'react';
import { Box, createStyles, Paper } from "@mantine/core";
import SpringDiv from "../../Component/SpringDiv";

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

const AgentsView = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <SpringDiv delay={100} duration={300}>
        
      </SpringDiv>
      <SpringDiv delay={300} duration={300} fullHeight>
        <Paper className={classes.containerListings}>
        </Paper>
      </SpringDiv>
    </Box>
  );
};

export default memo(AgentsView);
