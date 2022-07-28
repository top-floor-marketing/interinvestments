import { useState } from "react";
import { Alert, Box, createStyles, Text } from "@mantine/core";
import { Check, AlertCircle } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

import { ShareAgent, IconEditModal } from "../../ActionButtons";
import ModalEditInfo from "./modalEditInfo";

import { useMutationHelper } from "../../../GraphqlClient/useRequest";
import { MUTATION_EDIT_AGENT_PROFILE } from "../../../GraphqlClient/agentProfile.gql";

import PropTypes from 'prop-types';

import isEqual from 'lodash/isEqual';

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: theme.other.spacing.p3,
    justifyContent: "space-between",
    alignContent: "center"
  },
  titleCard: {
    fontSize: "18px",
    fontWeight: 700,
  },
  shareButton: {
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    borderRadius: "10px",
  },
  editButton: {
    marginTop: "auto",
    marginBottom: "auto"
  }
}));

const MyProfileActions = ({ isLoading, id, dataAgent, refetchData }) => {
  const { classes } = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const onSubmitForm = (data) => {
    try {
      if (isEqual(data, dataAgent)) {
        Alert("dataAgent")
      } else {
        fetchEditAgent({
          variables: {
            id,
            ...data
          }
        })
      }
    } catch (e) {
      setIsOpen(false);
    }
  }

  const { isLoading: isLoadingMutation, mutate: fetchEditAgent } = useMutationHelper({
    name: "edit-agent-profile",
    gql: MUTATION_EDIT_AGENT_PROFILE,
    config: {
      onSuccess: async () => {
        await refetchData();
        setIsOpen(false);
        showNotification({
          id: 'edit-agent-profile',
          disallowClose: true,
          title: "Profile updated",
          color: 'success',
          styles: (theme) => ({
            root: {
              width: "fit-content",
              marginLeft: "auto",
              backgroundColor: theme.colors.dark[6],
              borderColor: theme.colors.dark[6],
              '&::before': { backgroundColor: theme.white },
            },
            title: { color: theme.colors.white[1] },
            description: { color: theme.colors.dark[1] },
          }),
          icon: <Check />,
        });
      },
      onError: async () => {
        await refetchData();
        setIsOpen(false);
        showNotification({
          id: 'edit-agent-profile',
          disallowClose: true,
          title: "Error",
          color: 'secondary',
          styles: (theme) => ({
            root: {
              width: "fit-content",
              marginLeft: "auto",
              backgroundColor: theme.colors.error[6],
              borderColor: theme.colors.error[6],
              '&::before': { backgroundColor: theme.white },
            },
            title: { color: theme.white },
            description: { color: theme.white },
          }),
          icon: <AlertCircle />,
        });
      },
    },
  });

  return (
    <Box className={classes.container}>
      {
        (dataAgent) && <ModalEditInfo isOpen={isOpen} isLoading={isLoading || isLoadingMutation}
          onClose={() => setIsOpen(false)}
          dataAgent={dataAgent}
          onSubmit={onSubmitForm} />
      }
      <Text className={classes.titleCard}>My profile</Text>
      <ShareAgent id={id} disabled={isLoading || isLoadingMutation} className={classes.shareButton} size={24} />
      <IconEditModal
        onClick={() => setIsOpen(true)}
        disabled={isLoading}
        className={classes.editButton}
        size={24} />
    </Box>
  );
};

// Specifies the default values for props:
MyProfileActions.defaultProps = {
  isLoading: false,
  id: null,
  dataAgent: null,
  refetchData: () => { }
};

MyProfileActions.propTypes = {
  isLoading: PropTypes.bool,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  dataAgent: PropTypes.object,
  refetchData: PropTypes.func
};

export default MyProfileActions;
