import React, { useCallback } from "react";

import {
  Box,
  createStyles,
  Text,
  Paper,
  Button,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { openConfirmModal, closeAllModals } from '@mantine/modals';

import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";
import { ROUTES_NAMES } from "../../Route/routes";
import { LOCAL_STORAGE } from "../../Utils/globalConstants";

import { ArrowForwardUp, User, Mail, ArrowsDiff } from "tabler-icons-react";

import AvatarText from "../AvatarText";
import { CustomIconTooltip, IconOpenWhatsApp } from '../ActionButtons';

import BadgeContainer from "./badgeContainer";
import BodyContentTransfer from "./bodyContentTransfer";

import get from "lodash/get";
import capitalize from "lodash/capitalize";

const useStyles = createStyles((theme, _params) => {

  const { width, isShortLead, isAdminLeadView, isOfficeLead } = _params;

  // avatar reserved 60px,
  // gap reservered 16px
  // padding reserved 32px l + r
  // icon-actions 30px per icon
  // badge status reserved 180px
  let paddingReserved = isShortLead ? 24 : 32;
  let totalRows = 2;
  let avatarReserved = isShortLead ? 30 : 40;
  let iconsReserved = isShortLead ? 0 : isAdminLeadView ? 100 : 60;
  let badgeReserved = isShortLead ? 100 : 250;

  let gapReserved = (totalRows + 2) * 16;

  const widthReserved = avatarReserved + iconsReserved + gapReserved + paddingReserved + badgeReserved;
  const infoWidth = Math.round((width - widthReserved) / totalRows);

  return {
    containerItemListing: {
      border: isOfficeLead ? `1px solid ${theme.colors.secondary[9]}` : '0',
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
      },
      [`${theme.fn.smallerThan(700)}`]: {
        flexDirection: "column",
        width: "100% !important",
        flex: "1 !important"
      },
    },
    text: {
      fontWeight: isShortLead ? "300 !important" : "600 !important",
      margin: "0px !important",
      fontSize: "12px",
      [`${theme.fn.largerThan(1600)}`]: {
        fontSize: "14px",
      }
    },
    avatarText: {
      [`${theme.fn.smallerThan(700)}`]: {
        display: 'none !important'
      },
      '&:hover': {
        backgroundColor: theme.colors.gray[8],
        fontWeight: '700 !important',
        cursor: "pointer !important"
      }
    },
    containerIcons: {
      marginLeft: "auto",
      gap: theme.other.spacing.p2,
      display: "flex",
      justifyItems: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    adminLeadViewStatus: {
      padding: theme.other.spacing.p2,
      width: `${badgeReserved}px`,
      height: "100%",
      maxHeight: "120px",
      overflowY: "auto",
      overflowX: "hidden",
    },
    contentAllStatus: {
      height: "100%",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      gap: theme.other.spacing.p2,
    },
    itemStatus: {
      width: "100%",
      paddingRight: "5px",
      display: "flex",
      flexDirection: "row",
      gap: theme.other.spacing.p2,
      alignItems: "center"
    },
    buttonManageAgents: {
      width: "50px",
      padding: 0,
      '&:hover': {
        '.icon-tabler-arrows-diff': {
          color: theme.colors.secondary[0]
        }
      }
    }
  };
});

const ItemListingVirtual = (props) => {

  const { width: widthParent, isShortLead, isAdminLeadView, isOfficeLead } = props;

  const { actions: { setRoute } } = useClientGlobalStore();

  const { classes } = useStyles({ width: widthParent, isShortLead, isAdminLeadView, isOfficeLead });
  const matches = useMediaQuery('(max-width: 700px)');

  const getFirstNameUserLead = useCallback(() => {
    return get(props.userLead, ["firstName"], "");
  }, [props.userLead]);

  const getLastNameUserLead = useCallback(() => {
    return get(props.userLead, ["lastName"], "");
  }, [props.userLead]);

  const getEmailUserLead = useCallback(() => {
    return get(props.userLead, ["email"], "");
  }, [props.userLead]);

  const getIdLead = useCallback(() => {
    return get(props.userLead, ["id"], null);
  }, [props.userLead]);

  const getPhone = useCallback(() => {
    return get(props.userLead, ["phone"], null);
  }, [props.userLead]);

  const getOtherPhone = useCallback(() => {
    return get(props.userLead, ["otherPhones", "0"], null);
  }, [props.userLead]);

  const getAllAgentLeadsForTransfer = useCallback(() => {
    return props?.allAgentsStatus?.map((val) => ({
      value: get(val, ["databaseId"], 0),
      image: get(val, ["avatarProfile"], null),
      label: get(val, ["firstName"], "").concat(` ${get(val, ["lastName"], "")}`),
      email: get(val, ["email"], []),
    }
    ));
  }, [props.allAgentsStatus]);

  const setLeadDetail = () => {
    const idLead = getIdLead();
    const idAgent = get(props, ["agentId"], null);
    const allAgents = get(props, ["allAgentsStatus"], []).map((val) => (get(val, ["databaseId"], null)));
    localStorage.setItem(LOCAL_STORAGE.LEAD_DETAIL_ID, JSON.stringify({ idLead, idAgent, allAgents }));
    setRoute(ROUTES_NAMES.LEADS_DETAILS);
  }

  const openModalTransfer = () => {
    closeAllModals();
    openConfirmModal({
      title: '',
      children: (
        <BodyContentTransfer
          isOfficeLead={isOfficeLead}
          allAgentsStatus={getAllAgentLeadsForTransfer()}
          leadInfo={{
            email: getEmailUserLead(),
            firstName: getFirstNameUserLead(),
            lastName: getLastNameUserLead(),
            id: getIdLead()
          }}
        />
      ),
      size: "xl",
      closeOnClickOutside: false,
      closeOnConfirm: true,
      closeOnEscape: true,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });
  }

  return (
    <Paper className={classes.containerItemListing}>
      <AvatarText onClick={() => setLeadDetail()}
        size={isShortLead ? "30px" : "40px"}
        firstName={getFirstNameUserLead()}
        lastName={getLastNameUserLead()}
        className={classes.avatarText}
      />
      {
        (matches) ?
          <Box className={classes.itemsTextContainer}>
            <Text
              component="span"
              lineClamp={2}
              className={classes.text}
              title={`Lead name:\n${capitalize(`${getFirstNameUserLead()} ${getLastNameUserLead()}`)}`}
            >
              {capitalize(`${getFirstNameUserLead()} ${getLastNameUserLead()}`)}
            </Text>
            <Text
              lineClamp={2}
              className={classes.text}
              title={`Lead email:\n${getEmailUserLead()}`}
            >
              {getEmailUserLead()}
            </Text>
            <BadgeContainer
              isAdminLeadView={isAdminLeadView}
              isShortLead={isShortLead}
              setLeadDetail={setLeadDetail}
              classes={classes}
              currentStatus={props?.currentStatus}
              allAgentsStatus={get(props, ["allAgentsStatus"], [])}
            />
          </Box>
          :
          <>
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
            <BadgeContainer
              isAdminLeadView={isAdminLeadView}
              isShortLead={isShortLead}
              setLeadDetail={setLeadDetail}
              classes={classes}
              currentStatus={props?.currentStatus}
              allAgentsStatus={get(props, ["allAgentsStatus"], [])}
            />
          </>
      }

      {
        (!isShortLead)
        &&
        <Box className={classes.containerIcons}>
          <IconOpenWhatsApp size={24}
            labelTooltip="Send Whatsapp message"
            phoneNumber={getPhone()}
            otherPhoneNumber={getOtherPhone()} />
          <CustomIconTooltip
            size={24}
            labelTooltip="View lead details"
            onClick={setLeadDetail}>
            <ArrowForwardUp />
          </CustomIconTooltip>
          <Tooltip label="Manage lead agent" color="secondary">
            <Button onClick={() => openModalTransfer()} className={classes.buttonManageAgents} color="primary" >
              <ArrowsDiff />
            </Button>
          </Tooltip>
        </Box>
      }
    </Paper>
  );
};

export default ItemListingVirtual;
