import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Loader } from "@mantine/core";
// componen
import SelectStateLeads from "../SelectStateLeads";
import {
  notificationError,
  notificationSuccess,
} from "../../Component/Notifications";
// mantine dev
import {
  Box,
  Textarea,
  Group,
  SimpleGrid,
  Text,
  Button,
  createStyles,
  Timeline,
  ScrollArea,
} from "@mantine/core";

import { useMutationHelper } from "../../GraphqlClient/useRequest";
import { COMMENTS_USER_LEAD } from "../../GraphqlClient/leads.gql";

import { Mail, User } from "tabler-icons-react";

import ChipStatusLead from "../ItemLeadVirtual/chipStatusLead";
import get from "lodash/get";
import isEqual from "lodash/isEqual";

import useGetPersonalInfoLead from "../../Container/LeadDetailView/hooks/useGetPersonalInfoLead";
import TimelineContainer from "../../Container/LeadDetailView/commentsTimeline/timelineContainer";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p2,
  },
  changeGrid: {
    marginTop: theme.other.spacing.p2,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
    ".mantine-Text-root": {
      margin: "0px !important",
    },
  },
  selectContainer: {
    maxWidth: "350px !important",
  },
  badgeStatus: {
    width: "auto",
    marginRight: "auto",
    padding: theme.other.spacing.p4,
    borderRadius: "10px",
  },
}));

const BodyModal = ({ valueUserPipeline, onClose, refechPipeline, isAdmin }) => {
  const { classes } = useStyles();

  const { isLoading: isLoadingAllComments, allComments } =
    useGetPersonalInfoLead({
      idAgent: valueUserPipeline?.agentId,
      idLead: valueUserPipeline?.id,
    });

  const form = useForm({
    initialValues: {
      statusId: -1,
      comments: "",
    },
    // functions will be used to validate values at corresponding key
    validate: {
      statusId: (value) =>
        value < 1 ? "Select new lead state are required" : null,
      comments: (value) =>
        value.length < 1 ? "Reason for change state are required" : null,
    },
  });

  const { mutate: comment_user_lead, isLoading } = useMutationHelper({
    name: "comment_user_lead",
    gql: COMMENTS_USER_LEAD,
    config: {
      onError: () => {
        // alert error
        notificationError({
          id: "add-leads-error",
          position: "top-right",
          title: "Server error",
          color: "error",
        });
        onClose();
      },
      onSuccess: () => {
        notificationSuccess({
          id: "add-leads-error",
          position: "top-right",
          title: "Success to change lead state",
          color: "success",
        });
        refechPipeline(
          get(valueUserPipeline, ["currentStatus", "statusId"], 0),
          form.values.statusId
        );
        onClose();
      },
    },
  });

  const changeStateLead = (values) => {
    const { agentId, id } = valueUserPipeline;

    const idCurrentState = get(
      valueUserPipeline,
      ["currentStatus", "statusId"],
      null
    );

    if (!isEqual(idCurrentState, values.statusId))
      comment_user_lead({
        variables: {
          agentId,
          statusId: values.statusId,
          userLeadId: id,
          comments: values.comments || "",
        },
      });
    else onClose();
  };

  return (
    <form onSubmit={form.onSubmit((values) => changeStateLead(values))}>
      <Box className={classes.container}>
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: "36rem", cols: 1, spacing: "sm" }]}
        >
          <Box
            style={{
              width: "100%",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <Group>
              Current status:
              <ChipStatusLead
                className={classes.badgeStatus}
                status={valueUserPipeline?.currentStatus?.name}
              />
            </Group>

            <Group spacing="1rem">
              <User size={24} />
              <Text component="span">
                {valueUserPipeline?.firstName} {valueUserPipeline?.lastName}
              </Text>
            </Group>

            <Group spacing="1rem">
              <Mail size={24} />
              <Text component="span">
                {valueUserPipeline?.email?.toLowerCase() || "N/A"}
              </Text>
            </Group>
          </Box>

          <SimpleGrid cols={1}>
            <Text>History of changes:</Text>
            {isLoadingAllComments ? (
              <Group
                spacing="1rem"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loader color="primary" variant="bars" size="md" />
              </Group>
            ) : (
              <div style={{ width: "100%", height: "250px" }}>
                <TimelineContainer allComments={allComments} />
              </div>
            )}
          </SimpleGrid>
        </SimpleGrid>

        {!isAdmin ? (
          <>
            <SimpleGrid spacing="1rem" className={classes.changeGrid}>
              <Text color="dark" component="h3">
                Change lead state:
              </Text>
              <Box className={classes.selectContainer}>
                <SelectStateLeads
                  disabledList={[
                    get(valueUserPipeline, ["currentStatus", "statusId"], null),
                  ]}
                  disabled={isLoading}
                  placeholder="Select new lead state"
                  {...form.getInputProps("statusId")}
                />
              </Box>

              <Textarea
                placeholder="Reason for change state"
                label={null}
                autosize
                minRows={4}
                maxRows={8}
                {...form.getInputProps("comments")}
              />
            </SimpleGrid>

            <Group position="center">
              <Button
                type="button"
                disabled={isLoading}
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} loading={isLoading}>
                Submit
              </Button>
            </Group>
          </>
        ) : null}
      </Box>
    </form>
  );
};

export default BodyModal;
