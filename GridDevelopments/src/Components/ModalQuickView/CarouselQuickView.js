import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import { Image } from "@mantine/core";

import styles from "./styles.gd.module.scss";

import "./overrideStylesCarousel.css";

const CarouselQuickView = ({ photos }) => {
  const CustomIndicator = (props) => {
    const bgIsSelected = props.isSelected
      ? "bg-[#FFB839]"
      : "bg-white hover:bg-gray-200";
    return (
      <li
        onClick={() => props.onClickHandler()}
        className={styles.customIndicator + " " + bgIsSelected}
      ></li>
    );
  };

  if (photos.length === 0) {
    return (
      <div className={styles.containerNoImage}>
        <Image
          fit="contain"
          withPlaceholder
          className={styles.imageEmpty}
          caption="No images"
        />
      </div>
    );
  }
  return (
    <div className="w-full relative h-full p-0">
      <Carousel
        animationHandler="fade"
        autoPlay={true}
        interval={7000}
        infiniteLoop
        swipeable
        stopOnHover
        useKeyboardArrows
        axis="horizontal"
        transitionTime={700}
        showIndicators={true}
        showArrows={false}
        showThumbs={false}
        className={styles.carouselModal + " CarouselModal_wp"}
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
            className={styles.carouselImg}
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
