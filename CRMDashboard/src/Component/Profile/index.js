import { Box, createStyles } from "@mantine/core";
import { useSpring, animated } from "react-spring";

const useStyles = createStyles((theme, _params, getRef) => ({
  boxContainer: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gap: theme.other.spacing.p5,
  },
  boxGrid2: {
    display: "grid",
    gap: theme.other.spacing.p5,
    gridTemplateColumns: "1fr 1fr",
  },
}));

const Profile = () => {
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
        <Box></Box>
        <Box className={classes.boxGrid2}></Box>
      </Box>
    </animated.div>
  );
};

export default Profile;
