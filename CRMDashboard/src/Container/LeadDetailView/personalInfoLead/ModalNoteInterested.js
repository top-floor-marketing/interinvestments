import PropTypes from "prop-types";
import React from "react";
// mantine dev
import { Button, createStyles } from "@mantine/core";
import { Notes } from "tabler-icons-react";

const useStyles = createStyles((theme, _params) => ({
  Button: {
    width: "min-content",
    // backgroundColor: "transparent",
  },
}));

const ModalNoteInterested = ({ tite }) => {
  const { classes } = useStyles();
  return (
    <Button leftIcon={<Notes />} className={classes.Button}>
      {tite}
    </Button>
  );
};

ModalNoteInterested.propTypes = {
  tite: PropTypes.string,
};

export default ModalNoteInterested;
