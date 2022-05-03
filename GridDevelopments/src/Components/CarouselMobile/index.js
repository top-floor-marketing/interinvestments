import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";

import "./overrideStylesCarousel.css";

const CarouselMobile = ({ photos }) => {
  const random = Math.random() * (4000 - 1000) + 1000;
  return (
    <Carousel
      animationHandler="fade"
      autoPlay
      infiniteLoop
      interval={2500 + random}
      axis="horizontal"
      transitionTime={2000}
      showIndicators={false}
      showArrows={false}
      showThumbs={false}
      className="w-full h-full absolute overflow-hidden rounded-[10px] flex flex-col CarouselMobile_wp"
    >
      {photos.map((val, index) => (
        <img
          key={index}
          src={val.sourceUrl}
          alt="Interinvestments img"
          className="w-full h-full rounded-[10px] bg-no-repeat"
        />
      ))}
    </Carousel>
  );
};

CarouselMobile.propTypes = {
  photos: PropTypes.array,
};

export default CarouselMobile;
