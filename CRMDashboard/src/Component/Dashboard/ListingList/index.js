import { Box, Card, createStyles } from "@mantine/core";
import { useSpring, animated } from "react-spring";

import useGetListing from "./useGetListing";

// components
import SkeletonListing from "./skeletonListing";

const useStyles = createStyles((theme, _params, getRef) => ({
  cardContainer: {
    width: "100%",
    height: "500px",
    boxShadow: theme.shadows.md,
  },
  boxContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
}));

const ListingList = (props) => {
  const { classes } = useStyles();
  const animateProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: false,
    delay: 400,
    config: { duration: 300 },
  });

  const { isSkeleton } = useGetListing();
  return (
    <animated.div style={{ ...animateProps, gridArea: props.gridArea }}>
      <Card className={classes.cardContainer}>
        {isSkeleton ? (
          <SkeletonListing />
        ) : (
          <Box className={classes.boxContainer}></Box>
        )}
      </Card>
    </animated.div>
  );
};

export default ListingList;
