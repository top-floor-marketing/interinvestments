import { useState, useCallback } from "react";
import { Card, createStyles, Text, Skeleton, Group, Button, Modal, Box } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';

import useGetAgentListing from "./useGetAgentListing";

import { ListingVirtual } from "../../../Component/VirtualListContainer";
import ListingView from '../../ListingsView';

const useStyles = createStyles((theme, _params) => ({
  cardContainer: {
    width: "100%",
    minHeight: "250px",
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
  containerInfinite: {
    width: "100%",
    height: "100%",
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.fn.rgba(theme.colors.gray[0], 1),
  },
  bodyModal: {
    display: "flex",
    flexDirection: "column",
    height: "calc(80vh) !important",
    [`${theme.fn.smallerThan(600)}`]: {
      height: "600px !important",
    },
    [`${theme.fn.smallerThan(1400)}`]: {
      height: "calc(70vh) !important",
    }
  }
}));

const FeaturedListing = () => {

  const { width } = useViewportSize();

  const { classes } = useStyles({ width });

  const { isSkeleton, isLoading, listingAgent, totalData, refetchData } = useGetAgentListing();

  const [isOpenModalAddListing, setIsOpenModalAddListing] = useState(false);

  const getSizeModal = useCallback(() => {
    if(width>2000) return "80%";
    if(width>900) return "85%";
    if(width>800) return "95%";
    return "97%"
  },[width])

  const onCloseModalAddListing = () => {
    setIsOpenModalAddListing(false);
  }

  return (
    <Skeleton visible={isSkeleton} className={classes.cardContainer}>
      <Card className={classes.cardContainer}>
        <Group position="apart">
          <Text className={classes.titleCard}>Featured properties</Text>
          <Button
            color="dark"
            disabled={isLoading || isOpenModalAddListing}
            leftIcon={<IconPlus size={12} />}
            onClick={() => setIsOpenModalAddListing(true)}
          >
            Add featured property
          </Button>
          <Modal
            zIndex={200}
            onClose={() => onCloseModalAddListing()}
            centered
            closeOnEscape
            closeOnClickOutside
            opened={isOpenModalAddListing}
            size={getSizeModal()}
            overflow="inside"
            classNames={{
              modal: classes.modal,
              body: classes.bodyModal,
            }}
          >
            <ListingView />
          </Modal>
        </Group>
        <Box className={classes.containerInfinite}>
          {!isSkeleton && (
            <ListingVirtual
              name="featured-listing"
              data={listingAgent}
              totalData={totalData}
              refetch={refetchData}
              isLoading={isLoading}
              usingAddAndRemove={false}
            />
          )}
        </Box>
      </Card>
    </Skeleton>
  );
};

export default FeaturedListing;
