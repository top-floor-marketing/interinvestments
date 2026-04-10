import React from "react";
// mantine
import { Box, createStyles, Modal } from "@mantine/core";
// components
import BodyModal from "../ModalChangePipeline/BodyModal";

const useStyles = createStyles((theme, _params) => {
  return {
    modalBody: {
      padding: "0px !important",
    },
    ContainerModalBody: {
      display: "flex",
      flexDirection: "column",
      gap: theme.other.spacing.p2,
      padding: 0,
    },
  };
});

const ModalChangePipeline = (props) => {
  const { classes } = useStyles();
  const {
    openedMOdal,
    setOpenedModal,
    setvalueSelect,
    valueUserPipeline,
    setValueUserPipeline,
    refechPipeline,
    isAdmin = false
  } = props;

  const destroyModal = () => {
    setvalueSelect(null);
    setValueUserPipeline(null);
    setOpenedModal(false);
  };

  return (
    <Modal
      withCloseButton={true}
      size="xl"
      opened={openedMOdal}
      onClose={() => destroyModal()}
      title={null}
      classNames={{
        body: classes.modalBody,
      }}
    >
      <Box className={classes.ContainerModalBody}>
        <BodyModal
          refechPipeline={refechPipeline}
          onClose={() => destroyModal()}
          valueUserPipeline={valueUserPipeline}
          isAdmin={isAdmin}
        />
      </Box>
    </Modal>
  );
};

export default ModalChangePipeline;
