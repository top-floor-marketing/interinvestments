import { Box, createStyles } from "@mantine/core";

import SpringDiv from "../SpringDiv";

import DndColumn from "../DndColumn";

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        width: "100%",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4,
    },
}));

const Pipeline = () => {
  const { classes } = useStyles();
  return (
    <SpringDiv delay={300} duration={500}>
      <Box className={classes.container}>
            <DndColumn />
      </Box>
    </SpringDiv>
  );
};

export default Pipeline;
