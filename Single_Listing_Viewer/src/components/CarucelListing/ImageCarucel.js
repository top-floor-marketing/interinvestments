import React from "react";
// Import Swiper React components
import { SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// css
import styles from "./styles.cl.module.scss";
import "./stylesPagination.css";

const ImageCarucel = (value, index, data) => {
  switch (index) {
    case 0:
      return (
        <SwiperSlide key={index} className={styles.containerImage}>
          <img
            data-aos-once="true"
            data-aos-delay="300"
            data-aos-duration="2000"
            data-aos="fade-down"
            className={styles.imageCarucel}
            alt={`ImageCarucel_${index}`}
            src={value.sourceUrl}
          />
        </SwiperSlide>
      );
    case 1:
      return (
        <SwiperSlide key={index} className={styles.containerImage}>
          <img
            data-aos-once="true"
            data-aos-duration="2000"
            data-aos="fade-left"
            data-aos-delay="1100"
            className={styles.imageCarucel}
            alt={`ImageCarucel_${index}`}
            src={value.sourceUrl}
          />
        </SwiperSlide>
      );
    case data.photos.length - 1:
      return (
        <SwiperSlide key={index} className={styles.containerImage}>
          <img
            data-aos-once="true"
            data-aos-duration="2000"
            data-aos-delay="700"
            data-aos="fade-right"
            className={styles.imageCarucel}
            alt={`ImageCarucel_${index}`}
            src={value.sourceUrl}
          />
        </SwiperSlide>
      );
    default:
      return (
        <SwiperSlide key={index} className={styles.containerImage}>
          <img
            className={styles.imageCarucel}
            alt={`ImageCarucel_${index}`}
            src={value.sourceUrl}
          />
        </SwiperSlide>
      );
  }
};

export default ImageCarucel;
