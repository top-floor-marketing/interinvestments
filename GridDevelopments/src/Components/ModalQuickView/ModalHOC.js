import PropTypes from "prop-types";
import { Modal, Box, Button, ScrollArea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import styles from "./styles_gd.module.scss";

const ModalHOC = (props) => {
  const { onClose, config, opened } = props;
  const { width } = useViewportSize();

  const sizeModal =
    width > 2300
      ? "calc(70%)"
      : width > 1700
      ? "calc(80%)"
      : width > 1300
      ? "calc(83%)"
      : "calc(96%)";
  const propsModal = {
    opened,
    overlayProps: {
      overlayColor: "#000",
      overlayOpacity: 0.4,
      overlayBlur: 8,
    },
    onClose,
    padding: "xs",
    size: sizeModal,
    withCloseButton: false,
    centered: true,
    xOffset: "1vh",
    yOffset: "1vh",
    transitionProps: {
      transition: "fade",
      duration: 800,
      timingFunction: "linear",
    },
    ...config,
  };
  const allProps = {
    modal: propsModal,
    fullContent: {
      className: `${styles.modalFullContent}`,
    },
    headerClose: {
      className: "flex flex-row mb-3 bg-transparent",
      onClick: () => onClose(),
    },
    buttonClose: {
      onClick: () => onClose(),
      variant: "subtle",
      className: styles.buttonClose,
    },
    childrenModal: {
      className: styles.childrenModal,
    },
  };

  return (
    <Modal {...allProps.modal}>
      <Box className={`${styles.bodyModal} ${styles.scaleInCenter}`}>
        <Box {...allProps.headerClose}>
          <Button {...allProps.buttonClose}>X</Button>
        </Box>
        <Box component={ScrollArea} className={styles.contentModal}>
          {props.children}
        </Box>
      </Box>
    </Modal>
  );
};

ModalHOC.propTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func,
  config: PropTypes.object,
};

export default ModalHOC;
