import { Box, Paper, createStyles, Skeleton, Text } from "@mantine/core";
import { Mail, User, Phone } from "tabler-icons-react";

// components
import ModalNoteInterested from "./ModalNoteInterested";
import { IconOpenWhatsApp } from "../../../Component/ActionButtons";
import ChipStatusLead from "../../../Component/ItemLeadVirtual/chipStatusLead";
import { CustomIconTooltip } from "../../../Component/ActionButtons";

import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

const useStyles = createStyles((theme, _params) => ({
  cardContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: theme.shadows.sm,
    width: "30%",
    gap: theme.other.spacing.p4,
    [`${theme.fn.smallerThan(700)}`]: {
      width: "100%",
    },
    ".mantine-Paper-root": {
      width: "100% !important",
    },
  },
  badgeStatus: {
    width: "auto",
    marginRight: "auto",
    padding: theme.other.spacing.p4,
    borderRadius: "10px",
  },
  textTitle: {
    fontSize: "16px",
    fontWeight: 600,
    margin: "0px !important",
  },
  infoItem: {
    display: "flex",
    flexDirection: "row",
    gap: theme.other.spacing.p4,
    alignItems: "center",
    justifyItems: "center",
  },
}));

const PersonalInfoLead = ({ isSkeleton, dataLead }) => {
  const { classes } = useStyles();

  return (
    <Skeleton visible={isSkeleton} className={classes.cardContainer}>
      <Paper className={classes.cardContainer}>
        <Text transform="capitalize" size="16px" className={classes.textTitle}>
          Contact info
        </Text>
        <ChipStatusLead
          className={classes.badgeStatus}
          status={get(dataLead, ["currentStatus", "name"], "")}
        />
        <Box className={classes.infoItem}>
          <CustomIconTooltip
            size={24}
            color="secondary"
            labelTooltip={`${get(dataLead, ["firstName"], "")} ${get(
              dataLead,
              ["lastName"],
              ""
            )}`}
          >
            <User />
          </CustomIconTooltip>
          <Text transform="capitalize" size="14px" component="span">{`${get(
            dataLead,
            ["firstName"],
            ""
          )} ${get(dataLead, ["lastName"], "")}`}</Text>
        </Box>
        <Box className={classes.infoItem}>
          <CustomIconTooltip
            size={24}
            color="secondary"
            labelTooltip={get(dataLead, ["email"], "")}
          >
            <Mail />
          </CustomIconTooltip>
          <Text transform="capitalize" size="14px" component="span">
            {get(dataLead, ["email"], "")}
          </Text>
        </Box>
        {!isEmpty(get(dataLead, ["phone"], "")) && (
          <Box className={classes.infoItem}>
            <CustomIconTooltip
              size={24}
              color="secondary"
              labelTooltip={get(dataLead, ["phone"], "")}
            >
              <Phone />
            </CustomIconTooltip>
            <Text transform="capitalize" size="14px" component="span">
              {get(dataLead, ["phone"], "")}
            </Text>
            <IconOpenWhatsApp
              phoneNumber={get(dataLead, ["phone", "0"], "")}
              labelTooltip={`Send message to: ${get(dataLead, ["phone"], "")}`}
            />
          </Box>
        )}
        {!isEmpty(get(dataLead, ["otherPhones", "0"], "")) && (
          <Box className={classes.infoItem}>
            <CustomIconTooltip
              size={24}
              color="secondary"
              labelTooltip={get(dataLead, ["otherPhones", "0"], "")}
            >
              <Phone />
            </CustomIconTooltip>
            <Text transform="capitalize" size="14px" component="span">
              {get(dataLead, ["otherPhones", "0"], "")}
            </Text>
            <IconOpenWhatsApp
              labelTooltip={`Send message to: ${get(
                dataLead,
                ["otherPhones", "0"],
                ""
              )}`}
              phoneNumber={get(dataLead, ["otherPhones", "0"], "")}
            />
          </Box>
        )}

        <ModalNoteInterested
          commentListing={get(dataLead, ["commentListing"], null)}
          commentService={get(dataLead, ["commentService"], null)}
          tite="View Notes"
        />
      </Paper>
    </Skeleton>
  );
};

export default PersonalInfoLead;
