import { Box, createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  box: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Dashboard = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.box}>
      <h1>MANTINE TEST</h1>
    </Box>
  );
};

export default Dashboard;
