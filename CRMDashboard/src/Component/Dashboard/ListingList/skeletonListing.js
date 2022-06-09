import { Skeleton, Box, createStyles, ScrollArea } from "@mantine/core";
import fill from "lodash/fill";

const useStyles = createStyles((theme, _params, getRef) => ({
  boxContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    gap: theme.other.spacing.p5,
  },
  itemSkeleton: {
    width: "100%",
    height: "100px",
  },
}));

const SkeletonListing = () => {
  const { classes } = useStyles();
  const arrayFill = fill(Array(8), 0);
  return (
    <ScrollArea style={{ height: 500 }} offsetScrollbars>
      <Box className={classes.boxContainer}>
        {arrayFill.map((val, index) => (
          <Skeleton visible key={index}>
            <Box className={classes.itemSkeleton} key={index} />
          </Skeleton>
        ))}
      </Box>
    </ScrollArea>
  );
};

export default SkeletonListing;
