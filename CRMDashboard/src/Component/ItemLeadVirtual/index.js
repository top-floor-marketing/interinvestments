import React, { useCallback } from "react";

import {
  Box,
  Checkbox,
  createStyles,
  Avatar,
  Text,
  Badge,
  Paper,
  ActionIcon 
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";

import { Share } from "tabler-icons-react";

import AvatarText from "../AvatarText";

import ChipStatusLead from "./chipStatusLead";

import get from "lodash/get";
import concat from "lodash/concat";

const useStyles = createStyles((theme, _params) => {

  const { width } = _params;

  // avatar reserved 60px,
  // gap reservered 16px
  // padding reserved 32px l + r
  // icon-actions 30px per icon
  // badge status reserved 170px
  let paddingReserved = 32;
  let totalRows = 2;
  let avatarReserved = 60;
  let iconsReserved = 38;
  let badgeReserved = 170;

  let gapReserved = (totalRows+2) * 16;  
 
  const widthReserved = avatarReserved + iconsReserved + gapReserved + paddingReserved + badgeReserved;
  const infoWidth = Math.round((width - widthReserved) / totalRows);

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
    itemsTextContainer: {
      width: `${infoWidth}px`,
    },
    text: {
      fontWeight: "600 !important",
      margin: "0px !important",
      fontSize: "14px",
      "div::first-letter": {
        textTransform: "uppercase",
      },
    },
    actionIconContainer: {
      width: '38px',
      '.icon-tabler': {
        color: `${theme.colors.dark[0]}`
      }
    }
  };
});

const ItemListingVirtual = (props) => {

  const {
    ref: refParentBox,
    width: widthParent,
  } = useElementSize();

  const { cx,classes } = useStyles({width: widthParent});

  console.log("ItemListingVirtual", props);

  const getFirstNameUserLead = useCallback(() => {
    return get(props.userLead, ["firstName"], "");
  }, [props.userLead]);

  const getLastNameUserLead = useCallback(() => {
    return get(props.userLead, ["lastName"], "");
  }, [props.userLead]);

  return (
    <Paper ref={refParentBox} className={cx(classes.containerItemListing)}>
      <AvatarText size={"60px"} firstName={getFirstNameUserLead()} lastName={getLastNameUserLead()}/>
      <Box className={classes.itemsTextContainer}>
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
      </Box>
      <Box className={classes.itemsTextContainer}>
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
      </Box>
      <ChipStatusLead status={props?.currentStatus} />
      <ActionIcon className={classes.actionIconContainer} variant="transparent"><Share size={24} /></ActionIcon>
    </Paper>
  );
};

export default React.memo(ItemListingVirtual);
