import { Box, createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  box: {
    // subscribe to color scheme changes right in your styles
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],
    width: "100%",
    minHeight: "100vh",
    display: "flex",
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
