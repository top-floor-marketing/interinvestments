import { Box, createStyles } from "@mantine/core";
import { useSpring, animated } from "react-spring";

// components
import ProfileCard from "./ProfileCard";
import Contacts from "./Contacts";
import MyListings from "./MyListings";

const useStyles = createStyles((theme, _params, getRef) => ({
  boxContainer: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "1fr 1fr",
    gap: theme.other.spacing.p5,
    minHeigth: "600px",
    gridTemplateAreas: `
    'a a'
    'b c'
    `,
  },
}));

const Profile = () => {
  const { classes } = useStyles();
  const animateProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: false,
    delay: 200,
    config: { duration: 700 },
  });
  return (
    <animated.div style={animateProps}>
      <Box className={classes.boxContainer}>
        <ProfileCard gridArea="a" />
        <MyListings gridArea="b" />
        <Contacts gridArea="c" />
      </Box>
    </animated.div>
  );
};

export default Profile;
