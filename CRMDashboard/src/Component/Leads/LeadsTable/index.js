import { useState } from "react";
import { Box, createStyles, ScrollArea, Pagination } from "@mantine/core";

// Components
import ItemTable from "./itemTable";

// getDataHook
import useGetLeads from '../LeadsStore/useGetLeads';

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p5,
    alignItems: "end",
    position: "relative"
  },
  tableContainer: {
    width: "100%",
    height: "100%",
    minHeight: "50vh",
    backgroundColor: theme.fn.rgba(theme.colors.gray[5], 0.5),
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p5,
    padding: theme.other.spacing.p3,
    paddingBottom: theme.other.spacing.p8
  }
}));

const PipelineTable = () => {
  const { classes } = useStyles();
  const [activePage, onChangePage] = useState(1);

  const { isLoading, isSkeleton, leadsData, refetchData } = useGetLeads({ fetchInMount: true });

  console.log("dataLeads ", leadsData)

  return (
    <Box className={classes.container}>
      <Pagination page={activePage} onChange={onChangePage} total={10} />
      <ScrollArea style={{ height: 1200, width: "100%" }} offsetScrollbars scrollbarSize={6} scrollHideDelay={500}>
        <Box className={classes.tableContainer}>
        {
          leadsData.map((val) => {
            return (
              <ItemTable {...val} />
            )
          })
        }
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default PipelineTable;
