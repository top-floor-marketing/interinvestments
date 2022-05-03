import PropTypes from "prop-types";
import { Modal, Button } from "@mantine/core";

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
      modal: "p-0 w-4/5 lg:w-3/4 max-w-screen-xl bg-transparent",
    },
    centered: true,
    ...config,
  };
  const allProps = {
    modal: propsModal,
    bodyModal: {
      className:
        "w-full max-w-screen-xl bg-transparent flex flex-col min-h-[450px]",
    },
    headerClose: {
      className: "flex flex-row mb-3",
    },
    buttonClose: {
      onClick: () => onClose(),
      variant: "subtle",
      className:
        "ml-auto hover:bg-[rgb(156_163_175)] w-[1.7rem] h-[1.7rem] p-0 text-[18px] rounded-full flex justify-center items-center text-white font-semibold border border-white border-solid",
    },
    children: {
      className: "bg-white w-full",
    },
  };
  return (
    <Modal {...allProps.modal}>
      <div {...allProps.bodyModal} data-aos="zoom-in" data-aos-duration="700">
        <div {...allProps.headerClose}>
          <Button {...allProps.buttonClose}>X</Button>
        </div>
        <div {...allProps.children}>{props.children}</div>
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
