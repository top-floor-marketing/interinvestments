import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import { Image } from "@mantine/core";
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
          "inline-block min-h-[5px] min-w-[50px] mr-2 transition-all duration-500 ease-in-out hover:cursor-pointer " +
          bgIsSelected
        }
      ></li>
    );
  };

  if (photos.length === 0) {
    return (
      <div className="z-[600] w-full h-full flex flex-col p-0">
        <Image
          fit="contain"
          withPlaceholder
          className="z-[600] mx-auto my-auto w-full h-fit"
        />
      </div>
    );
  }
  return (
    <div className="w-full relative h-full p-0">
      <Carousel
        animationHandler="fade"
        autoPlay={true}
        interval={5000}
        infiniteLoop
        stopOnHover
        useKeyboardArrows
        axis="horizontal"
        transitionTime={1200}
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
