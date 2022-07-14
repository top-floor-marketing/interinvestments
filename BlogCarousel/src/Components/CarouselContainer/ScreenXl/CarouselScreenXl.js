import { Button } from "@mantine/core";
import { useSwiperSlide } from 'swiper/react';

import classNames from "classnames";

import styles from "./styles_bc.module.scss";

const CarouselScreenXl = (props) => {

  const {
    urlImage,
    description,
    id,
    title,
    imageAnimation,
    contentAnimation
  } = props;

  const swiperSlide = useSwiperSlide();

  const getRandomIndex = () => {
    return Math.floor(Math.random() * (1 - 0 + 1) + 0)
  }

  const classesAnimation = {
    content: classNames(styles.content, {
      [contentAnimation[getRandomIndex()]]: swiperSlide.isActive
    }),
    image: classNames(styles.containerImage, {
      [imageAnimation[getRandomIndex()]]: swiperSlide.isActive
    }),
  }

  //swiperSlide.isActive ? "animate__animated animate__bounce  animate__delay-2s" : ""
  // swiperSlide.isActive
  return (
    <div className={styles.container}>
      <div className="w-full flex flex-row">

          <div className={classesAnimation.content}>
            <label className={styles.labelFrom}>FROM OUR BLOG</label>
            <label className={styles.labelTitle}>{title}</label>
            <label className={styles.description}>{description}</label>
            <Button
              component="a"
              href={`/post?=${id}`}
              variant="white"
              className={styles.buttonReadMore}
            >
              Read More
            </Button>
          </div>

      </div>

      <div className={classesAnimation.image}>
        <img src={urlImage} alt="alt" className={styles.image} />
      </div>

    </div>
  );
};

export default CarouselScreenXl;
