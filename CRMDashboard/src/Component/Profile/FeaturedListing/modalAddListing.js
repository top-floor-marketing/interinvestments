import { Box, createStyles, Text, Modal, Group, Button, ScrollArea, TextInput } from "@mantine/core";

import { useForm, joiResolver } from '@mantine/form';
import { RichTextEditor } from '@mantine/rte';
import Joi from 'joi';
import { get } from "lodash";
import { Edit } from 'tabler-icons-react';

const useStyles = createStyles((theme, _params, getRef) => ({
  boxTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: theme.other.spacing.p2,
  },
  titleModal: {
    margin: "0px !important",
    padding: "0px !important",
    color: theme.colors.dark[0],
    fontSize: "18px",
    lineHeight: "20px",
    fontWeight: 700,
  },
  containerForm: {
    paddingRight: "5px !important",
    width: "100%",
    display: "grid",
    maxHeight: "62vh",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: theme.other.spacing.p4,
    marginBottom: theme.other.spacing.p4,
    [`${theme.fn.smallerThan(750)}`]: {
      gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    },
    ".mantine-RichTextEditor-toolbar": {
      display: "none !important"
    }
  },
  gridColumnFull: {
    gridColumn: "1 / -1",
    width: "100%"
  },
  labelAboutMe: {
    display: "inline-block",
    fontSize: "14px",
    fontWeight: 500,
    color: "#1b1b1b",
    wordBreak: "break-word",
    cursor: "col-resize"
  },
}));


const ModalAddListing = ({ isOpen, arrayIdListings, onClose, isLoading }) => {
  const { classes } = useStyles();

  return (
    <Modal
      closeOnEscape={!isLoading}
      closeOnClickOutside={false}
      closeButtonLabel={!isLoading}
      opened={isOpen}
      onClose={() => onClose()}
      title={<Box className={classes.boxTitle}>
        <Edit size={20} />
        <Text component="h1" className={classes.titleModal}>Add featured listings</Text>
      </Box>}
    >

    </Modal>
  );
};

// Specifies the default values for props:
ModalAddListing.defaultProps = {
  isOpen: false,
  isLoading: false,
  arrayIdListings: [],
  onClose: () => { },
};

export default ModalAddListing;
