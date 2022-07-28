import { Card, createStyles, Text, Skeleton, Group, Button } from "@mantine/core";
import { IconPlus } from '@tabler/icons';

import useGetAgentListing from "./useGetAgentListing";

import InfiniteListingScroll from './infiniteListingScroll';

const useStyles = createStyles((theme, _params) => ({
  cardContainer: {
    width: "100%",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    boxShadow: theme.shadows.sm,
    gap: theme.other.spacing.p4,
    height: "100%",
  },
  titleCard: {
    fontSize: "18px",
    fontWeight: 700,
  },
  boxInfiniteLoader: {
    width: "100%",
    height: "100%",
    minHeight: "250px",
    maxHeight: "500px",
  },
  scrollTest: {
    width: "100%",
    backgroundColor: theme.colors.success[0],
    height: "150px",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
  }
}));

const FeaturedListing = (props) => {

  const { classes } = useStyles();

  const { isSkeleton, isLoading, listingAgent, totalData, refetchData } = useGetAgentListing();

  return (
    <Skeleton visible={isSkeleton} className={classes.cardContainer}>
      <Card className={classes.cardContainer}>
        <Group position="apart">
          <Text className={classes.titleCard}>Featured listings</Text>
          <Button color="dark" leftIcon={<IconPlus size={12} />}>
            Add featured listing
          </Button>
        </Group>
        <InfiniteListingScroll
          parentClassname={classes.boxInfiniteLoader}
          name="agent"
          data={listingAgent}
          totalData={totalData}
          refetch={refetchData}
          isLoading={isLoading} />
      </Card>
    </Skeleton>

  );
};

export default FeaturedListing;
