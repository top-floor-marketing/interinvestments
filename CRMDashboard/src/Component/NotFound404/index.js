import { Box, createStyles, Text } from "@mantine/core";

const useStyles = createStyles(() => ({
  box: {
    width: "100%",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
  },
  text: {
    fontSize: "20px",
    margin: "2rem",
  },
}));

const NotFound404 = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.box}>
      <Text className={classes.text}>404</Text>
    </Box>
  );
};

export default NotFound404;
