import { Box, createStyles } from "@mantine/core";
import { useSpring, animated } from "react-spring";

// components
import ListingList from "./ListingList";
import LeadScroll from "./LeadsScroll";
import ChartTwo from "./ChartTwo";
import ChartOne from "./ChartOne";

import SpringDiv from "../SpringDiv";

const useStyles = createStyles((theme, _params, getRef) => ({
  boxContainer: {
    display: "grid",
    width: "100%",
    minHeight: "300px",
    gap: theme.other.spacing.p5,
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gridTemplateRows: "repeat(2, minmax(0, auto))",
    gridTemplateAreas: `
    'a b b'
    'd d c'
    'd d c'
    `,
    [`${theme.fn.smallerThan("lg")}`]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gridTemplateRows: "repeat(3, minmax(0, auto))",
      gridTemplateAreas: `
    'b b'
    'a c'
    'd d'
    `,
    },
    [`${theme.fn.smallerThan("md")}`]: {
      gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
      gridTemplateRows: "repeat(4, minmax(0, auto))",
      gridTemplateAreas: `
    'a'
    'b'
    'c'
    'd'
    `,
    },
  },
  boxItem: {
    minHeight: "100px",
    width: "100%",
    height: "auto",
  },
}));

const Dashboard = () => {
  const { classes } = useStyles();
  return (
    <SpringDiv delay={300} duration={500}>
      <Box className={classes.boxContainer}>
        <SpringDiv style={{gridArea:"a" }} delay={100} duration={500}>
          <ChartOne />
        </SpringDiv>
        <ChartTwo gridArea="b" />
        <LeadScroll gridArea="c" />
        <ListingList gridArea="d" />
      </Box>
    </SpringDiv>
  );
};

export default Dashboard;
