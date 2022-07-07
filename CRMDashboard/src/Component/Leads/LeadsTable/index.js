import { useState } from "react";
import { Box, createStyles, ScrollArea, Pagination } from "@mantine/core";

import { useId } from '@mantine/hooks';

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
    padding: theme.other.spacing.p3
  }
}));

/* id: useId("test-"),
    imageUrl: "https://www.exalco.gr/uploads/resources/10823/mls-central-office-building-thessaloniki-40-normal.jpg?lm=1435F7BDBEABA38D5F412518F7E055E9" ,
    name: "John Doe Smith",
    phoneNumber:  "(555)555-555",
    email: "testImageEmailMLS@gmail.com" */

const PipelineTable = () => {
  const { classes } = useStyles();
  const [activePage, onChangePage] = useState(1);

  const { isLoading, dataLeads, refetchData } = useGetLeads({ fetchInMount: false });

  return (
    <Box className={classes.container}>
      <Pagination page={activePage} onChange={onChangePage} total={10} />
      <ScrollArea style={{ height: 1000, width: "100%" }} offsetScrollbars scrollbarSize={6} scrollHideDelay={500}>
        <Box className={classes.tableContainer}>
        {
         /*  new Array(10).fill(0).map((val,index) => {
            const even = (index % 2 == 0);
            const random = even ? 0 : 1;
            return (
              <ItemTable {...dummyData[random]} key={index} />
            )
          }) */
        }
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default PipelineTable;
