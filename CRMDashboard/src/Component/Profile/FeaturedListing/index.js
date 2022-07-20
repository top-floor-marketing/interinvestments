import { Card, createStyles, Text, Skeleton } from "@mantine/core";

import useGetAgentListing from "./useGetAgentListing";

import LoadInfiniteScroll from "../../LoadInfiniteScroll";

const useStyles = createStyles((theme, _params) => ({
  cardContainer: {
    width: "100%",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    boxShadow: theme.shadows.sm,
    gap: theme.other.spacing.p5,
    height: "100%",
  },
  titleCard: {
    fontSize: "18px",
    fontWeight: 700,
  },
  boxInfiniteLoader: {
    width: "100%",
    height: "100%",
    minHeight:"250px",
    maxHeight:"250px",
  }
}));

const FeaturedListing = (props) => {

  const { classes } = useStyles();

  const { isSkeleton, isLoading, listingAgent, totalData, refetchData } = useGetAgentListing();

  return (
    <Skeleton visible={isSkeleton} className={classes.cardContainer}>
      <Card className={classes.cardContainer}>
        <Text className={classes.titleCard}>Featured listings</Text>
        <LoadInfiniteScroll
          parentClassname={classes.boxInfiniteLoader}
          name="listing"
          data={listingAgent}
          totalData={totalData}
          refetch={refetchData}
          isLoading={isLoading} />
      </Card>
    </Skeleton>

  );
};

export default FeaturedListing;
