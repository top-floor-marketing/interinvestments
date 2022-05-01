import PropTypes from "prop-types";
import { Modal, Button } from "@mantine/core";

import ModalHOC from "./ModalHOC";
import CarouselQuickView from "./CarouselQuickView";

const ModalQuickView = ({ data, onClose }) => {
  const { id, content } = data;
  const allProps = {
    modalHoc: {
      onClose,
      opened: true,
    },
  };
  return (
    <ModalHOC {...allProps.modalHoc}>
      <>
        <div className="flex flex-row min-h-[400px] border border-solid border-b-[#D1D1D1] gap-0 border-x-0">
          <div className="w-2/3 border border-solid border-r-[#D1D1D1] border-y-0 border-l-0">
            <CarouselQuickView photos={content.photos} />
          </div>
          <div className="w-1/3"></div>
        </div>
        <div className="flex flex-row min-h-[100px]">
          <div className="w-2/3 border border-solid border-r-[#D1D1D1] border-y-0 border-l-0"></div>
          <div className=" w-1/3"></div>
        </div>
      </>
    </ModalHOC>
  );
};

ModalQuickView.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
};

export default ModalQuickView;
