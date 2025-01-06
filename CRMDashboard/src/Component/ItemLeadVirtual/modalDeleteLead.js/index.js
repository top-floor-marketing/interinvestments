import React, { useState, useEffect } from "react";

import { Box, Text, Button, Tooltip } from "@mantine/core";
import { openConfirmModal, closeAllModals } from "@mantine/modals";

import { notificationError } from "../../Notifications";
import { useMutationHelper } from "../../../GraphqlClient/useRequest";
import { COMMENTS_USER_LEAD } from "../../../GraphqlClient/leads.gql";
import ChipStatusLead from "../chipStatusLead";
import AvatarText from "../../AvatarText";
import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import { EraserOff } from "tabler-icons-react";
import get from "lodash/get";

const ModalDeleteLead = (props) => {
  
  const { onFinishDeleteLead = null, leadInfo = null } = props;
  const [blockButton, setBlockButton] = useState(false);

  const {
    state: {
      global: { statusUserLead: listStatus },
      user: {
        infoUser: { databaseId },
      },
    },
  } = useClientGlobalStore();

  const disabledIdState = listStatus.find(
    (e) => e?.label.toLowerCase() === "disabled"
  );

  // MUTATIONS
  const { mutate: comment_user_lead, isLoading } = useMutationHelper({
    name: ["delete_user_lead"],
    gql: COMMENTS_USER_LEAD,
    config: {
      cacheTime: 0,
      onSuccess: async () => {
        //setCountFinishDeleted((count) => count + 1);
        onFinishDeleteLead();
      },
      onError: async () => {
        notificationError({
          id: "add-leads-error",
          title: "Server error",
          color: "error",
        });
      },
    },
  });

/*   useEffect(() => {
    if (countFinishDeleted === leadInfo?.agents.length) {
      if (onFinishDeleteLead) onFinishDeleteLead();
    }
  }, [countFinishDeleted, leadInfo, onFinishDeleteLead]); */

  const openModalDeleteLead = () => {
    closeAllModals();
    openConfirmModal({
      title: "",
      children: (
        <Box
          style={{
            minHeight: "200px",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete this lead?
          </Text>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Text>
              <Text
                component="span"
                style={{
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                Name:
              </Text>{" "}
              {leadInfo?.name}
            </Text>
            <Text>
              <Text
                component="span"
                style={{
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                Email:
              </Text>{" "}
              {leadInfo?.email}
            </Text>
            <Text>
              <Text
                component="span"
                style={{
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                Phone:
              </Text>{" "}
              {leadInfo?.phone}
            </Text>
            <Box
              style={{
                display: "flex",
                gap: "0.5rem",
                flexDirection: "column",
              }}
            >
              {leadInfo?.agents.map((val, index) => (
                <Box
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginRight: "0",
                    width: "max-content",
                  }}
                >
                  <ChipStatusLead
                    isShort={false}
                    status={val?.currentStatus}
                    onClick={null}
                  />
                  <AvatarText
                    size={"30px"}
                    firstName={get(val, ["firstName"], null)}
                    lastName={get(val, ["lastName"], null)}
                    src={get(val, ["avatarProfile"], null)}
                    tooltipLabel={`Agent: ${get(val, ["firstName"], "")} ${get(
                      val,
                      ["lastName"],
                      ""
                    )}`}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ),
      size: "xl",
      closeOnClickOutside: isLoading || blockButton ? false : true,
      closeOnConfirm: false,
      closeOnEscape: isLoading || blockButton ? false : true,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { disabled: isLoading || blockButton },
      cancelProps: { disabled: isLoading || blockButton },
      onCancel: () => {},
      onConfirm: async () => {
        // Selecciona el div con la clase `mantine-Group-root`
        const groupDiv = document.querySelector(".mantine-Group-root");

        // Encuentra todos los botones dentro de ese div
        const buttons = groupDiv.querySelectorAll("button");

        // Itera sobre cada botón, eliminando `onClick` y agregando `disabled`
        buttons.forEach((button) => {
          button.removeAttribute("onClick"); // Elimina el atributo `onClick`
          button.setAttribute("disabled", "true"); // Agrega el atributo `disabled`
        });
        setBlockButton(true);
        if (leadInfo?.agents.length) {
          for (let i = 0; i < leadInfo?.agents.length; i++) {
            comment_user_lead({
              variables: {
                agentId: leadInfo?.agents[i]?.id,
                userLeadId: leadInfo?.id,
                statusId: disabledIdState?.value,
                comments: "Lead deleted",
              },
            });
          }
        } else {
          comment_user_lead({
            variables: {
              agentId: databaseId,
              userLeadId: leadInfo?.id,
              statusId: disabledIdState?.value,
              comments: "Lead deleted",
            },
          });
        }
      },
    });
  };

  return (
    <Box
      style={{
        position: "absolute",
        top: "0.5rem",
        right: "1.75rem",
        width: "25px",
        height: "25px",
      }}
    >
      <Tooltip label="Delete lead" color="error">
        <Button
          onClick={() => openModalDeleteLead()}
          color="error"
          size="xs"
          style={{
            padding: "0.25rem",
          }}
        >
          <EraserOff />
        </Button>
      </Tooltip>
    </Box>
  );
};

export default ModalDeleteLead;
