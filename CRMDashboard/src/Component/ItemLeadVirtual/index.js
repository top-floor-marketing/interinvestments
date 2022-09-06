import React, { useCallback, useEffect } from "react";

import {
  Box,
  Checkbox,
  createStyles,
  Avatar,
  Text,
  Badge,
  Paper,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { MapPin, Check } from "tabler-icons-react";

import {
  ShareListing,
  ViewLandingListing,
  IconDownloadPdf,
  IconRemove,
  IconAddListing,
} from "../ActionButtons";

import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

import ChipStatusLead from "./chipStatusLead";

import classNames from "classnames";

import get from "lodash/get";
import concat from "lodash/concat";
import head from "lodash/head";
import capitalize from "lodash/capitalize";

const useStyles = createStyles((theme, _params) => {
  return {
    containerItemListing: {
      width: "100%",
      boxShadow: theme.shadows.lg,
      height: "100%",
      backgroundColor: theme.colors.gray[0],
      display: "flex",
      flexDirection: "row",
      justifyItems: "start",
      alignItems: "center",
      padding: theme.other.spacing.p4,
      gap: theme.other.spacing.p8,
    },
    text: {
      fontWeight: "600 !important",
      margin: "0px !important",
      fontSize: "14px",
      "div::first-letter": {
        textTransform: "uppercase",
      },
    },
  };
});

const ItemListingVirtual = (props) => {
  const { classes } = useStyles();

  console.log("ItemListingVirtual", props);

  const getStatusLead = useCallback(() => {
    return get(props.userLead, ["finalStatus", "status"], "");
  }, [props.userLead]);

  const getFirstNameUserLead = useCallback(() => {
    return get(props.userLead, ["firstName"], "");
  }, [props.userLead]);

  const getLastNameUserLead = useCallback(() => {
    return get(props.userLead, ["lastName"], "");
  }, [props.userLead]);

  return (
    <Paper className={classes.containerItemListing}>
      <Avatar radius="_40px" size={"40px"} color="primary">
        {concat(head(getFirstNameUserLead()), head(getLastNameUserLead()))}
      </Avatar>
      <Text
        lineClamp={2}
        className={classes.text}
        title={`Lead:\n${concat(
          getFirstNameUserLead(),
          " ",
          getLastNameUserLead()
        )}`}
      >
        {concat(getFirstNameUserLead(), " ", getLastNameUserLead())}
      </Text>
      <ChipStatusLead status={getStatusLead()} />
    </Paper>
  );
};

export default React.memo(ItemListingVirtual);
