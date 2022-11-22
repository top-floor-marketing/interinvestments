import { Button } from "@mantine/core";
import { useSwiperSlide } from 'swiper/react';
import { ChevronRight } from "tabler-icons-react";

import classNames from "classnames";

import styles from "./styles_bc.module.scss";

const ENVIROMENT_BC = process.env.REACT_APP_NODE_ENV;
const DOMAIN_URL_BC =
  ENVIROMENT_BC === "production"
    ? process.env.REACT_APP_DOMAIN_PROD
    : process.env.REACT_APP_DOMAIN_DEV;

const CarouselScreenXl = (props) => {

  const {
    urlImage,
    description,
    uri,
    title,
    agentId
  } = props;

  const swiperSlide = useSwiperSlide();

  const classesAnimation = {
    content: classNames(styles.content, {
      "animate__animated animate__delay-0.5s animate__slow animate__fadeInUp": swiperSlide.isActive
    }),
    image: classNames(styles.containerImage, {
      "animate__animated animate__slow animate__slideInDown": swiperSlide.isActive
    }),
  }

  const urlBlog = (uri && agentId) ? `${DOMAIN_URL_BC}${uri}/?agent-id=${agentId}&shared=true`: `${DOMAIN_URL_BC}${uri}`;

  return (
    <div className={styles.container}>
      <div className={classesAnimation.content}>
        <label className={styles.labelFrom}>FROM OUR BLOG</label>
        <label className={styles.labelTitle}>{title}</label>
        <label className={styles.description}>{description}</label>
        <Button
          component="a"
          href={urlBlog}
          variant="white"
          className="btn-wp-primary-icon font-bold"
        >
          Read More
          <ChevronRight />
        </Button>
      </div>

      <div className={classesAnimation.image}>
        <img src={urlImage} alt="alt" className={styles.image} />
      </div>
    </div>
  );
};

export default CarouselScreenXl;
