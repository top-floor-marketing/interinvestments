import { useState } from "react";
import { Box, createStyles, Text } from "@mantine/core";
import { useForm, joiResolver } from '@mantine/form';

import { ShareAgent, IconEditModal } from "../../ActionButtons";
import ModalEditInfo from "./modalEditInfo";

import { useMutationHelper } from "../../../GraphqlClient/useRequest";
import { MUTATION_EDIT_AGENT_PROFILE } from "../../../GraphqlClient/agentProfile.gql";

import PropTypes from 'prop-types';

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

const MyProfileActions = ({ isLoading, id, dataAgent }) => {
  const { classes } = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const onSubmitForm = (data) => {
    console.log("onSubmitForm ", data)
  }

  const { data, isError, isLoading: isLoadingMutation, mutate: fetchEditAgent } = useMutationHelper({
    name: "edit-agent-profile",
    gql: MUTATION_EDIT_AGENT_PROFILE,
    config: {
      onSuccess: (response) => {

      },
      onError: () => {

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
  dataAgent: null
};

MyProfileActions.propTypes = {
  isLoading: PropTypes.bool,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  dataAgent: PropTypes.object
};

export default MyProfileActions;
