import React from "react";

import { Box, Text, Button, Tooltip } from "@mantine/core";
import { openConfirmModal, closeAllModals } from "@mantine/modals";

import { notificationError } from "../../Notifications";
import { useMutationHelper } from "../../../GraphqlClient/useRequest";
import { MUTATION_LEADS_ASSIGNMENT } from "../../../GraphqlClient/leads.gql";
import ChipStatusLead from "../chipStatusLead";
import AvatarText from "../../AvatarText";
import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import { EraserOff } from "tabler-icons-react";
import get from "lodash/get";

const ModalDeleteLead = (props) => {
  const { onFinishDeleteLead = null, leadInfo = null } = props;

  const {
    state: {
      global: { statusUserLead: listStatus },
    },
  } = useClientGlobalStore();

  console.log("listStatus", listStatus);

  // MUTATIONS
  const { mutateAsync: fetchTransferAgent } = useMutationHelper({
    name: ["transfer-agents-leads"],
    gql: MUTATION_LEADS_ASSIGNMENT,
    config: {
      cacheTime: 0,
      onSuccess: async () => {
        if (onFinishDeleteLead) onFinishDeleteLead();
      },
      onError: async () => {
        notificationError({
          id: "transfer-agents-leads",
          title: "Server error",
          color: "error",
        });
      },
    },
  });

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
      closeOnClickOutside: false,
      // closeOnConfirm: true,
      closeOnEscape: true,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => {},
      onConfirm: async () => {},
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
