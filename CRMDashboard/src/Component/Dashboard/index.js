import { Box, createStyles } from "@mantine/core";
import { useSpring, animated, Transition } from "react-spring";

// components
import ListingList from "./ListingList";
import LeadScroll from "./LeadsScroll";
import ChartTwo from "./ChartTwo";
import ChartOne from "./ChartOne";

const useStyles = createStyles((theme, _params, getRef) => ({
  boxContainer: {
    display: "grid",
    width: "100%",
    minHeight: "300px",
    gap: theme.other.spacing.p5,
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gridTemplateRows: "repeat(2, minmax(0, 1fr))",
    gridTemplateAreas: `
    'a b c'
    'd d c'
    'd d c'
    `,
    [`${theme.fn.smallerThan("lg")}`]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gridTemplateRows: "repeat(3, minmax(0, 1fr))",
      gridTemplateAreas: `
    'a b'
    'c c'
    'd d'
    `,
    },
    [`${theme.fn.smallerThan("md")}`]: {
      gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
      gridTemplateRows: "repeat(4, minmax(0, 1fr))",
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
  const animateProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: false,
    delay: 200,
    config: { duration: 1000 },
  });
  return (
    <animated.div style={animateProps}>
      <Box className={classes.boxContainer}>
        <ChartOne gridArea="a" />
        <ChartTwo gridArea="b" />
        <LeadScroll gridArea="c" />
        <ListingList gridArea="d" />
      </Box>
    </animated.div>
  );
};

export default Dashboard;
