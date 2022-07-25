import { useState } from "react";
import { Box, createStyles, Text } from "@mantine/core";

import { ShareAgent, IconEditModal } from "../../ActionButtons";
import ModalEditInfo from "./modalEditInfo";

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

  return (
    <Box className={classes.container}>
        <ModalEditInfo isOpen={isOpen} onClose={() => setIsOpen(false)} dataAgent={dataAgent} />
        <Text className={classes.titleCard}>My profile</Text>
        <ShareAgent id={id} disabled={isLoading} className={classes.shareButton} size={24}/>
        <IconEditModal onClick={() => setIsOpen(true)} disabled={isLoading || isOpen} className={classes.editButton} size={24}/>
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
