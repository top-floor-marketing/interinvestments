import PropTypes from "prop-types";
import { forwardRef, useImperativeHandle } from 'react';
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Image } from "@mantine/core";

import styles from "./styles_alv.module.scss";

import "./overrideStylesCarousel.css";

const CarouselQuickView = forwardRef(({ photos }, ref) => {

  const [currentSlide, setCurrentSlide] = useState(0);

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

  useImperativeHandle(ref, () => ({
    next() {
      setCurrentSlide((e) => e + 1);
    },
    prev() {
      setCurrentSlide((e) => e - 1);
    },
  }));

  const updateCurrentSlide = (index) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
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
    <div className="w-full relative min-h-[40vh] h-full p-0">
      <Carousel
        animationHandler="fade"
        autoPlay={true}
        interval={30000}
        infiniteLoop
        swipeable
        stopOnHover
        useKeyboardArrows
        axis="horizontal"
        transitionTime={700}
        showIndicators={true}
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        selectedItem={currentSlide}
        onChange={updateCurrentSlide}
        className={`${styles.carouselModal} singleViewModal`}
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <CustomIndicator
            index={index}
            label={label}
            onClickHandler={onClickHandler}
            isSelected={isSelected}
          />
        )}

      >
        {photos.slice(0, 8).map((val, index) => (
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
});

CarouselQuickView.propTypes = {
  photos: PropTypes.array,
};

export default CarouselQuickView;
