import { useState } from "react";
import { Box, createStyles, ScrollArea, Pagination } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p5,
    alignItems: "end"
  },
  tableContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.fn.rgba(theme.colors.gray[8], 0.5),
    borderRadius: "10px",
  }
}));

const PipelineTable = () => {
  const { classes } = useStyles();
  const [activePage, onChangePage] = useState(1);
  return (
    <Box className={classes.container}>
      <Pagination page={activePage} onChange={onChangePage} total={10} />
      <ScrollArea style={{ maxHeight: 600 }} offsetScrollbars scrollbarSize={6} scrollHideDelay={500}>
        <Box className={classes.tableContainer}>

        </Box>
      </ScrollArea>
    </Box>
  );
};

export default PipelineTable;
