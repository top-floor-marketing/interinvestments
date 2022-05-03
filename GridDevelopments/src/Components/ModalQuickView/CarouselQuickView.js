import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "./styles.css";

const CarouselQuickView = ({ photos }) => {
  const CustomIndicator = (props) => {
    const bgIsSelected = props.isSelected
      ? "bg-[#FFB839]"
      : "bg-white hover:bg-gray-200";
    return (
      <li
        onClick={() => props.onClickHandler()}
        className={
          "inline-block min-h-[5px] min-w-[50px] mx-2 transition-all duration-500 ease-in-out hover:cursor-pointer " +
          bgIsSelected
        }
      ></li>
    );
  };
  return (
    <div className="w-full relative h-full p-0">
      <Carousel
        animationHandler="fade"
        autoPlay={true}
        infiniteLoop
        stopOnHover
        useKeyboardArrows
        axis="horizontal"
        transitionTime={700}
        showIndicators={true}
        showArrows={false}
        showThumbs={false}
        className="z-[600] w-full h-full absolute overflow-hidden flex flex-col p-0 CarouselModal_wp"
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <CustomIndicator
            index={index}
            label={label}
            onClickHandler={onClickHandler}
            isSelected={isSelected}
          />
        )}
      >
        {photos.map((val, index) => (
          <img
            key={index}
            src={val.sourceUrl}
            alt="Interinvestments img"
            className="w-full h-full bg-no-repeat z-[610]"
          />
        ))}
      </Carousel>
    </div>
  );
};

CarouselQuickView.propTypes = {
  photos: PropTypes.array,
};

export default CarouselQuickView;
