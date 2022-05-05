import { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";

import CarouselMobile from "./Mobile/CarouselMobile";
import CarouselScreenXl from "./ScreenXl/CarouselScreenXl";

const CarouselContainer = (props) => {
  const { listBlogs, isMobileScreen } = props;

  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (!autoPlay) {
      setTimeout(() => {
        setAutoPlay(true);
      }, 7000);
    }
  }, [autoPlay]);
  return (
    <Carousel
      selectedItem={0}
      axis="vertical"
      autoPlay={false}
      infiniteLoop
      interval={7000}
      transitionTime={1200}
      showThumbs={false}
      showArrows={false}
      stopOnHover
      showStatus={false}
      showIndicators={false}
      renderIndicator={false}
      className="w-full h-full flex flex-col"
    >
      {listBlogs.map((val, index) => {
        return (
          <div key={index}>
            {isMobileScreen ? (
              <CarouselMobile />
            ) : (
              <CarouselScreenXl {...val} totalData={listBlogs.length} />
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
