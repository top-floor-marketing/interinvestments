import { useState } from "react";
import { Card, createStyles, Text, Skeleton, Group, Button,Modal } from "@mantine/core";
import { IconPlus } from '@tabler/icons';

import useGetAgentListing from "./useGetAgentListing";

import VirtualAgentListingScroll from './virtualAgentListingScroll';
import ListingView from '../../ListingsView';


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
  modalListing: {
    '.mantine-Modal-body': {
      height: "100% !important"
    }
  }
}));

const FeaturedListing = () => {

  const { classes } = useStyles();

  const { isSkeleton, isLoading, listingAgent, totalData, refetchData } = useGetAgentListing();

  const [isOpenModalAddListing, setIsOpenModalAddListing] = useState(false);

  const onCloseModalAddListing = () => {
    setIsOpenModalAddListing(false);
  }

  return (
    <Skeleton visible={isSkeleton} className={classes.cardContainer}>
      <Card className={classes.cardContainer}>
        <Group position="apart">
          <Text className={classes.titleCard}>Featured listings</Text>
          <Button
            color="dark"
            disabled={isLoading || isOpenModalAddListing}
            leftIcon={<IconPlus size={12} />}
            onClick={() => setIsOpenModalAddListing(true)}
          >
            Add featured listing
          </Button>
          <Modal zIndex={200} className={classes.modalListing} onClose={() => onCloseModalAddListing()} centered closeOnEscape overflow="inside" closeOnClickOutside fullScreen opened={isOpenModalAddListing}>
            <ListingView />
          </Modal>
        </Group>
        <VirtualAgentListingScroll
          parentClassname={classes.boxInfiniteLoader}
          name="agent"
          data={listingAgent}
          totalData={totalData}
          refetch={refetchData}
          isLoading={isLoading}
        />
      </Card>
    </Skeleton>
  );
};

export default FeaturedListing;
