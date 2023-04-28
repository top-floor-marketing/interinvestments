import { Box, createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params) => ({
  box: {
    // subscribe to color scheme changes right in your styles
    backgroundColor: theme.colors.gray[0],
    display: "flex",
    flexDirection: "column",
  },
}));

const MantineTest = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.box}>
      <h1>MANTINE TEST</h1>
    </Box>
  );
};

export default MantineTest;
