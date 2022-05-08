import { useState } from "react";

import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";

import CarouselMobile from "./Mobile/CarouselMobile";
import CarouselScreenXl from "./ScreenXl/CarouselScreenXl";

const CarouselContainer = (props) => {
  const { listBlogs, isMobileScreen } = props;

  const [activeBlog, setActiveBlog] = useState(0);

  const nextBlog = () => {
    setActiveBlog(activeBlog + 1);
  };

  const prevBlog = () => {
    setActiveBlog(activeBlog - 1);
  };

  const specificBlog = (index) => {
    setActiveBlog(index);
  };

  const onChangeCurrentSlide = (index) => {
    if (activeBlog !== index) {
      setActiveBlog(index);
    }
  };

  const allProps = {
    carousel: {
      selectedItem: activeBlog,
      onChange: onChangeCurrentSlide,
      axis: "vertical",
      autoPlay: false,
      infiniteLoop: true,
      interval: 7000,
      transitionTime: 800,
      showThumbs: false,
      showArrows: false,
      stopOnHover: true,
      dynamicHeight: true,
      showStatus: false,
      showIndicators: false,
      renderIndicator: false,
      className: "flex flex-col",
    },
    carouselMobile: {
      nextBlog,
      prevBlog,
      specificBlog,
      activeBlog,
      totalData: listBlogs.length,
    },
    carouselScreenXl: {
      nextBlog,
      prevBlog,
      specificBlog,
      activeBlog,
      totalData: listBlogs.length,
    },
  };

  return (
    <Carousel {...allProps.carousel}>
      {listBlogs.map((val, index) => {
        return (
          <div key={index}>
            {isMobileScreen ? (
              <CarouselMobile {...val} {...allProps.carouselMobile} />
            ) : (
              <CarouselScreenXl {...val} {...allProps.carouselScreenXl} />
            )}
          </div>
        );
      })}
    </Carousel>
  );
};

CarouselContainer.propTypes = {
  isMobileScreen: PropTypes.bool,
  listBlogs: PropTypes.array,
};

export default CarouselContainer;
