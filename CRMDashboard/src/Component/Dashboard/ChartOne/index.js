import { Box, Card, createStyles } from "@mantine/core";
import { useSpring, animated } from "react-spring";

const useStyles = createStyles((theme, _params, getRef) => ({
  cardContainer: {
    width: "100%",
    minHeight: "400px",
    boxShadow: theme.shadows.md,
  },
  boxContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
}));

const ChartOne = (props) => {
  const { classes } = useStyles();
  const animateProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: false,
    delay: 100,
    config: { duration: 500 },
  });
  return (
    <animated.div style={{ ...animateProps, gridArea: props.gridArea }}>
      <Card className={classes.cardContainer}>
        <Box className={classes.boxContainer}>CHARTONE</Box>
      </Card>
    </animated.div>
  );
};

export default ChartOne;
