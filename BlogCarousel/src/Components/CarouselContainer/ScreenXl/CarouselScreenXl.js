import { Button } from "@mantine/core";
import { useSwiperSlide } from 'swiper/react';

import classNames from "classnames";

import styles from "./styles_bc.module.scss";

const ENVIROMENT_BC = process.env.REACT_APP_NODE_ENV;
const DOMAIN_URL_BC =
ENVIROMENT_BC === "production"
    ? process.env.REACT_APP_DOMAIN_PROD
    : process.env.REACT_APP_DOMAIN_DEV;

const CarouselScreenXl = (props) => {

  // slug, id
  const {
    urlImage,
    description,
    uri,
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

  return (
    <div className={styles.container}>
      
          <div className={classesAnimation.content}>
            <label className={styles.labelFrom}>FROM OUR BLOG</label>
            <label className={styles.labelTitle}>{title}</label>
            <label className={styles.description}>{description}</label>
            <Button
              component="a"
              href={uri ? DOMAIN_URL_BC.concat(uri) : "#"}
              variant="white"
              className="btn-wp-primary"
            >
              Read More
            </Button>
          </div>

      <div className={classesAnimation.image}>
        <img src={urlImage} alt="alt" className={styles.image} />
      </div>

    </div>
  );
};

export default CarouselScreenXl;
