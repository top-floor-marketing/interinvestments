import React, { useCallback, useRef } from "react";

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

import { notificationError, notificationSuccess } from "../Notifications";
import { useMutationHelper } from "../../GraphqlClient/useRequest";
import { MUTATION_LEADS_ASSIGNMENT } from "../../GraphqlClient/leads.gql";

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
import difference from 'lodash/difference';
import forEach from 'lodash/forEach';

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

  const { width: widthParent, isShortLead, isAdminLeadView, isOfficeLead, refetch } = props;

  const { actions: { setRoute }, state: { user: { infoUser: { databaseId } } } } = useClientGlobalStore();

  const { classes } = useStyles({ width: widthParent, isShortLead, isAdminLeadView, isOfficeLead });
  const matches = useMediaQuery('(max-width: 700px)');

  const refBodyTransferModal = useRef(null);

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

    // AllAgents for admin version of ``leadDetailView`` for tabs 
    const allAgents = get(props, ["allAgentsStatus"], []).map((val) => (
      {
        id: get(val, ["databaseId"], null),
        fullName: `${get(val, ["firstName"], "")} ${get(val, ["lastName"], "")}`
      }
    ));

    localStorage.setItem(LOCAL_STORAGE.LEAD_DETAIL_ID, JSON.stringify({ idLead, idAgent, allAgents }));
    setRoute(ROUTES_NAMES.LEADS_DETAILS);
  }

  // MUTATIONS
  const { mutateAsync: fetchTransferAgent } = useMutationHelper({
    name: ["transfer-agents-leads"],
    gql: MUTATION_LEADS_ASSIGNMENT,
    config: {
      cacheTime: 0,
      onSuccess: async () => {
        // parent leads view refetch data
        refetch()
        notificationSuccess({
          id: "transfer-agents-leads",
          title: "Assigned agents success",
          color: "success",
        });
      },
      onError: async () => {
        // parent leads view refetch data
        refetch()
        notificationError({
          id: "transfer-agents-leads",
          title: "Server error",
          color: "error",
        });
      },
    },
  });

  const openModalTransfer = () => {
    closeAllModals();
    openConfirmModal({
      title: '',
      children: (
        <BodyContentTransfer
          ref={refBodyTransferModal}
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
      // closeOnConfirm: true,
      closeOnEscape: true,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => { },
      onConfirm: async () => {
        if (refBodyTransferModal.current) {

          // list of Ids transfer list with "assigned agents" new selecteds
          const newTransfer = refBodyTransferModal.current.getCheckSelectedList();

          // original transfer list with "assigned agents"
          const oldTransfer = getAllAgentLeadsForTransfer();

          // array of original transfer list
          const idOld = oldTransfer.map((e) => e.value);

          // get removeAgents or newAgents
          const removeAgents = difference(idOld, newTransfer);
          const newAgents = difference(newTransfer, idOld);

          if (!removeAgents && !newAgents) {
            return null;
          } else if (newTransfer.length === 0) {
            // set office/admin default agent
            const allMutations = [];
            forEach(oldTransfer, (e) => {
              allMutations.push(fetchTransferAgent({
                variables: {
                  input: {
                    lastAgentId: e,
                    newAgentId: databaseId,
                    userLead: getIdLead()
                  }
                }
              }))
            })
            await Promise.all(allMutations);
            return null;
          }

          // only new agents for lead
          if(newAgents.length && removeAgents.length !== newAgents.length) {
            const allMutations = []
            forEach(newAgents, (e, index) => {
              allMutations.push(fetchTransferAgent({
                variables: {
                  input: {
                    lastAgentId: null,
                    newAgentId: e,
                    userLead: getIdLead()
                  }
                }
              }))
            })
            await Promise.all(allMutations);
            return null;
          }

          console.log("removeAgents", removeAgents);
          console.log("newAgents", newAgents);
          console.log("newTransfer", newTransfer)
          // only removeAgents for lead and assign office
          if(removeAgents.length && removeAgents.length !== newAgents.length && !newTransfer.length) {
            const allMutations = []
            forEach(removeAgents, (e, index) => {
              allMutations.push(fetchTransferAgent({
                variables: {
                  input: {
                    lastAgentId: e,
                    newAgentId: databaseId,
                    userLead: getIdLead()
                  }
                }
              }))
            })
            await Promise.all(allMutations);
            return null;
          }

          // same length removeAgents and newAgents
          if (removeAgents.length && newAgents.length) {
            const allMutations = []
            forEach(newAgents, (e, index) => {
              allMutations.push(fetchTransferAgent({
                variables: {
                  input: {
                    lastAgentId: removeAgents[index],
                    newAgentId: e,
                    userLead: getIdLead()
                  }
                }
              }))
            })
            await Promise.all(allMutations);
            return null;
          }

          // only removeAgents for lead
          if (removeAgents.length) { 
            const allMutations = []
            forEach(removeAgents, (e, index) => {
              allMutations.push(fetchTransferAgent({
                variables: {
                  input: {
                    lastAgentId: e,
                    newAgentId: null,
                    userLead: getIdLead()
                  }
                }
              }))
            })
            await Promise.all(allMutations);
            return null;
          }

        }
      }
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

          {
            (isAdminLeadView)
            &&
            <Tooltip label="Manage lead agent" color="secondary">
              <Button onClick={() => openModalTransfer()} className={classes.buttonManageAgents} color="primary" >
                <ArrowsDiff />
              </Button>
            </Tooltip>
          }

        </Box>
      }
    </Paper>
  );
};

export default ItemListingVirtual;
