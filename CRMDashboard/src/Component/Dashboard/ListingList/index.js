import {
  Box,
  Card,
  createStyles,
  Text,
  Avatar,
  ScrollArea,
  Button,
} from "@mantine/core";
import { useSpring, animated } from "react-spring";

import useGetListing from "./useGetListing";

// components
import SkeletonListing from "./skeletonListing";

// icons
import { ExternalLink, Download, View360, Plus } from "tabler-icons-react";

import get from "lodash/get";

const useStyles = createStyles((theme, _params, getRef) => ({
  cardContainer: {
    width: "100%",
    height: "600px",
    boxShadow: theme.shadows.md,
  },
  boxContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignContent: "center",
    gap: theme.other.spacing.p4,
    paddingBottom: theme.other.spacing.p8,
  },
  itemListing: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    minHeight: "80px",
    height: "max-content",
    padding: theme.other.spacing.p4,
    gap: theme.other.spacing.p8,
    alignContent: "center",
    backgroundColor: theme.colors.gray[0],
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: theme.colors.gray[5],
    },
  },
  avatarContainer: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  textContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
  },
  textTitle: {
    height: "min-content",
    fontSize: "18px",
    color: theme.colors.dark[0],
    textTransform: "capitalize",
  },
  buttonContainer: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
    flexWrap: "wrap",
    flexDirection: "row",
    height: "max-content",
    marginTop: "auto",
    marginBottom: "auto",
    gap: theme.other.spacing.p3,
  },
  buttonItem: {
    span: {
      margin: 0,
    },
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

  const { isSkeleton, listingData } = useGetListing();
  return (
    <animated.div style={{ ...animateProps, gridArea: props.gridArea }}>
      <Card className={classes.cardContainer}>
        {isSkeleton ? (
          <SkeletonListing />
        ) : (
          <ScrollArea style={{ height: 550 }} offsetScrollbars>
            <Box className={classes.boxContainer}>
              {listingData.map((val, index) => {
                const photos = get(val, [
                  "listingData",
                  "newDevelopment",
                  "photos",
                ]);
                const neighborhoods = get(val, ["neighborhoods", "nodes"]);
                return (
                  <Box className={classes.itemListing} key={index}>
                    <Avatar
                      radius="xxl"
                      size="xl"
                      src={photos ? photos[0].sourceUrl : ""}
                      alt="Profile Image"
                      className={classes.avatarContainer}
                    />
                    <Box className={classes.textContainer}>
                      <Text className={classes.textTitle}>{val.title}</Text>
                      {neighborhoods.length > 0 && (
                        <Text className={classes.textTitle}>
                          {neighborhoods[0].slug}
                        </Text>
                      )}
                    </Box>
                    <Box className={classes.buttonContainer}>
                      <Button compact leftIcon={<View360 size={14} />}>
                        View Details
                      </Button>
                      <Button
                        compact
                        leftIcon={<Plus size={14} />}
                        color="secondary"
                      >
                        Add to Profile
                      </Button>
                      <Button
                        compact
                        className={classes.buttonItem}
                        leftIcon={<ExternalLink size={14} />}
                        color="dark"
                      ></Button>
                      <Button
                        compact
                        className={classes.buttonItem}
                        leftIcon={<Download size={14} />}
                        color="dark"
                      ></Button>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </ScrollArea>
        )}
      </Card>
    </animated.div>
  );
};

export default ListingList;
