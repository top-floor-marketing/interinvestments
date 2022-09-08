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

import { ArrowForwardUp, User, Mail } from "tabler-icons-react";

import AvatarText from "../AvatarText";
import { CustomIconTooltip } from '../ActionButtons';

import ChipStatusLead from "./chipStatusLead";

import get from "lodash/get";
import capitalize from "lodash/capitalize";

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

  let gapReserved = (totalRows + 2) * 16;

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
      gap: theme.other.spacing.p4,
    },
    itemsTextContainer: {
      display: "flex",
      flexDirection: "row",
      gap: theme.other.spacing.p2,
      alignItems: "center",
      width: `${infoWidth}px`,
      '.icon-tabler': {
        color: `${theme.colors.dark[0]}`
      }
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

  const {
    ref: refParentBox,
    width: widthParent,
  } = useElementSize();

  const { cx, classes } = useStyles({ width: widthParent });

  const getFirstNameUserLead = useCallback(() => {
    return get(props.userLead, ["firstName"], "");
  }, [props.userLead]);

  const getLastNameUserLead = useCallback(() => {
    return get(props.userLead, ["lastName"], "");
  }, [props.userLead]);

  const getEmailUserLead = useCallback(() => {
    return get(props.userLead, ["email"], "");
  }, [props.userLead]);

  return (
    <Paper ref={refParentBox} className={cx(classes.containerItemListing)}>
      <AvatarText size={"60px"} firstName={getFirstNameUserLead()} lastName={getLastNameUserLead()} />
      <Box className={classes.itemsTextContainer}>
        <User
          size={24}
        />
        <Text
          component="span"
          lineClamp={2}
          className={classes.text}
          title={`Lead name:\n${capitalize(`${getFirstNameUserLead()} ${getLastNameUserLead()}`)}`}
        >
          {capitalize(`${getFirstNameUserLead()} ${getLastNameUserLead()}`)}
        </Text>
      </Box>
      <Box className={classes.itemsTextContainer}>
        <Mail
          size={24}
        />
        <Text
          lineClamp={2}
          className={classes.text}
          title={`Lead email:\n${getEmailUserLead()}`}
        >
          {getEmailUserLead()}
        </Text>
      </Box>
      <ChipStatusLead status={props?.currentStatus} />
      <CustomIconTooltip size={24} labelTooltip="View lead details">
        <ArrowForwardUp />
      </CustomIconTooltip>
    </Paper>
  );
};

export default React.memo(ItemListingVirtual);
