import { useState } from "react";
import { ChevronRight } from "tabler-icons-react";
import PropTypes from "prop-types";

const CarouselContainer = (props) => {
  const { listBlogs, isMobileScreen } = props;

  return (
    <div className="w-full h-screen bg-blue-500">
      <button className="button-wp-primary flex">
        Load More
        <ChevronRight />
      </button>
    </div>
  );
};

CarouselContainer.propTypes = {
  isMobileScreen: PropTypes.bool,
  listBlogs: PropTypes.array,
};

export default CarouselContainer;
