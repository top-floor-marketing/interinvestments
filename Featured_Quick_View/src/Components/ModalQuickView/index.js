import { Loader, Overlay, Center } from "@mantine/core";
import PropTypes from "prop-types";

const ModalQuickView = ({ showOverlay, modalQuickView }) => {
  const { id, content } = modalQuickView;
  return null;
};

ModalQuickView.propTypes = {
  showOverlay: PropTypes.bool,
  modalQuickView: PropTypes.object,
};

export default ModalQuickView;
