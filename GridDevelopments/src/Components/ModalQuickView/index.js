import PropTypes from "prop-types";
import { Button } from "@mantine/core";

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
        <div className="flex flex-row min-h-[500px] border border-solid border-b-[#D1D1D1] gap-0 border-x-0">
          <div className="w-2/3 border border-solid border-r-[#D1D1D1] border-y-0 border-l-0">
            <CarouselQuickView photos={content.photos} />
          </div>
          <div className="w-1/3 flex flex-col p-5 gap-5"></div>
        </div>
        <div className="flex flex-row min-h-[100px]">
          <div className="w-2/3 border border-solid border-r-[#D1D1D1] border-y-0 border-l-0 grid grid-cols-1 p-5 gap-2">
            <label className="font-outfit text-[40px] font-[400] text-black mb-0">
              {content.title}
            </label>
            <label className="mt-auto font-outfit text-[22px] text-black">
              {content.listingData.newDevelopment.nameOfDevelopment}
            </label>
          </div>
          <div className="w-1/3 flex flex-col p-5">
            <Button
              variant="white"
              component="a"
              href={`/project?id=${id}`}
              className="text-black font-[400] uppercase font-outfit text-[20px] bg-white hover:bg-gray-200 my-auto h-full"
            >
              View Project
            </Button>
          </div>
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
