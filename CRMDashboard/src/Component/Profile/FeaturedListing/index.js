import { Box, Card, createStyles, Text } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';

import InfiniteScrollContainer from "./infiniteScrollContainer";
import useGetAgentListing from "./useGetAgentListing";

const useStyles = createStyles((theme, _params) => ({
  cardContainer: {
    width: "100%",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    boxShadow: theme.shadows.sm,
    gap: theme.other.spacing.p5,
    height: "auto",
  },
  titleCard: {
    fontSize: "18px",
    fontWeight: 700,
  },
  boxInfiniteLoader: {
    width: "100%",
    minHeight: "200px",
    maxHeight: "400px"
  }
}));

const FeaturedListing = (props) => {
  const { classes } = useStyles();

  const { isSkeleton, isLoading, listingAgent, totalData, refetchData  } = useGetAgentListing();

  return (
      <Card className={classes.cardContainer}>
        <Text className={classes.titleCard}>Featured listings</Text>
        <Box className={classes.boxInfiniteLoader}>
          <InfiniteScrollContainer data={listingAgent} refetch={refetchData} isLoading={isLoading} />
        </Box>  
      </Card>
  );
};

export default FeaturedListing;
