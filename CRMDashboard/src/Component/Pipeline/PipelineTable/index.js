import { useState } from "react";
import { Box, createStyles, ScrollArea, Pagination, Accordion, useAccordionState } from "@mantine/core";

import { useId } from '@mantine/hooks';

// Components
import ItemTable from "./itemTable";

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
    backgroundColor: theme.fn.rgba(theme.colors.gray[5], 0.5),
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p5,
    padding: theme.other.spacing.p3
  }
}));

const PipelineTable = () => {
  const { classes } = useStyles();
  const [activePage, onChangePage] = useState(1);
  const [accordionState, handlersAccordion] = useAccordionState({ total: 10, initialItem: -1 });
  const dummyData = [{
    id: useId("test-"),
    imageUrl: "https://www.exalco.gr/uploads/resources/10823/mls-central-office-building-thessaloniki-40-normal.jpg?lm=1435F7BDBEABA38D5F412518F7E055E9" ,
    name: "John Doe Smith",
    phoneNumber:  "(555)555-555",
    email: "testImageEmailMLS@gmail.com"
  },
  {
    id: useId("test-"),
    imageUrl: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt92407140cee4688a/60dc2b1222d24e38a38c8ac6/7c418f59b234271bd6522d7dcf3393daa6b27c23.jpg" ,
    name: "Fulanito Perez Gomez",
    phoneNumber:  "(555)555-555",
    email: "PerezGomezEmailMLS@gmail.com"
  },
]
  return (
    <Box className={classes.container}>
      <Pagination page={activePage} onChange={onChangePage} total={10} />
      <ScrollArea style={{ height: 600, width: "100%" }} offsetScrollbars scrollbarSize={6} scrollHideDelay={500}>
        <Box className={classes.tableContainer}>
        {
          new Array(10).fill(0).map((val,index) => {
            const random =  Math.floor(Math.random() * (2 - 1) + 1)
            return (
              <ItemTable {...dummyData[random-1]} key={index} />
            )
          })
         }
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default PipelineTable;
