import PropTypes from "prop-types";
import { Modal, Button } from "@mantine/core";

import styles from "./styles.module.scss";

const ModalHOC = (props) => {
  const { onClose, config, opened } = props;
  const propsModal = {
    opened,
    overlayColor: "#000",
    overlayOpacity: 0.4,
    overlayBlur: 8,
    onClose,
    withCloseButton: false,
    classNames: {
      modal: styles.modal,
    },
    centered: true,
    ...config,
  };
  const allProps = {
    modal: propsModal,
    fullContent: {
      className: styles.modalFullContent,
    },
    headerClose: {
      className: "flex flex-row mb-3",
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
      <div {...allProps.fullContent} data-aos="fade-up" data-aos-duration="700">
        <div {...allProps.headerClose}>
          <Button {...allProps.buttonClose}>X</Button>
        </div>
        <div {...allProps.childrenModal}>{props.children}</div>
      </div>
    </Modal>
  );
};

ModalHOC.propTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func,
  config: PropTypes.object,
};

export default ModalHOC;
