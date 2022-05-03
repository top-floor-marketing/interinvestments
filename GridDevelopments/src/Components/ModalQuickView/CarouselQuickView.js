import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselQuickView = ({ photos }) => {
  return (
    <Carousel
      animationHandler="fade"
      autoPlay={false}
      infiniteLoop
      axis="horizontal"
      transitionTime={700}
      showIndicators={true}
      showArrows={false}
      showThumbs={true}
      className="w-full h-full absolute overflow-hidden rounded-[10px] flex flex-col"
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

CarouselQuickView.propTypes = {
  photos: PropTypes.array,
};

export default CarouselQuickView;
