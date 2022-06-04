import { Box, Card, createStyles } from "@mantine/core";
import { useSpring, animated } from "react-spring";

const useStyles = createStyles((theme, _params, getRef) => ({
  cardContainer: {
    width: "100%",
    minHeight: "200px",
    boxShadow: theme.shadows.md,
    height: "100%",
  },
  boxContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
}));

const Contacts = (props) => {
  const { classes } = useStyles();
  const animateProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: false,
    delay: 500,
    config: { duration: 300 },
  });
  return (
    <animated.div style={{ ...animateProps, gridArea: props.gridArea }}>
      <Card className={classes.cardContainer}>
        <Box className={classes.boxContainer}>ProfileList</Box>
      </Card>
    </animated.div>
  );
};

export default Contacts;
