import { memo } from 'react';
import {
  Paper,
  createStyles,
  Text,
  Box,
  ScrollArea,
  Skeleton,
  Avatar,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";

import { BuildingSkyscraper } from "tabler-icons-react";

import useGetInterested from "../hooks/useGetInterested";

import get from 'lodash/get';

import ItemListingVirtual from "../../../Component/ItemListingVirtual";

const useStyles = createStyles((theme, _params) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
    height: "100%",
    minHeight: "240px !important",
    maxHeight: "400px !important",
  },
  textTitle: {
    fontSize: "16px",
    fontWeight: 600,
    margin: "0px !important",
  },
  interested: {
    width: "100%",
    gap: theme.other.spacing.p4,
    height: "100%",
  },
  interestedContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
    height: "100%",
    paddingBottom: theme.other.spacing.p2,
  },
  paperService: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: theme.other.spacing.p4,
    backgroundColor: theme.colors.gray[0],
    alignItems: "center"
  },
  serviceTitle: {
    fontWeight: "600 !important",
    margin: "0px !important",
    fontSize: "14px",
    height: 'auto'
  },
}));

const LeadInterested = () => {
  const { classes } = useStyles();

  const { isSkeleton, dataInterested, agentId } = useGetInterested();

   const {
     ref: refParentBox,
     width: widthParent,
   } = useElementSize();

  return (
    <Skeleton className={classes.container} visible={isSkeleton}>
      <Paper className={classes.container}>
        <Text transform="capitalize" size="16px" className={classes.textTitle}>
          Interested in
        </Text>
        <Box className={classes.interested} component={ScrollArea}>
          <Box className={classes.interestedContent} ref={refParentBox}>
            {get(dataInterested, ["listingList"], []).map((val, index) => {
              return (
                <Box
                  key={index}
                  style={{
                    width: `${widthParent - 16 / 1.5}px`,
                    height: "90px",
                  }}
                >
                  <ItemListingVirtual
                    {...val}
                    idAgent={agentId}
                    width={widthParent - 16 / 1.5}
                  />
                </Box>
              );
            })}
            {get(dataInterested, ["serviceList"], []).map((val, index) => {
              return (
                <Paper
                  key={index}
                  className={classes.paperService}
                  style={{
                    width: `${widthParent - 16 / 1.5}px`,
                    height: "90px",
                  }}
                >
                  <Avatar
                    radius="_40px"
                    size={widthParent < 600 ? "30px" : "60px"}
                    color="primary"
                  >
                    <BuildingSkyscraper />
                  </Avatar>
                  <Text component="span" className={classes.serviceTitle}> {val.title}</Text>
                </Paper>
              );
            })}
          </Box>
        </Box>
      </Paper>
    </Skeleton>
  );
};

export default memo(LeadInterested);
