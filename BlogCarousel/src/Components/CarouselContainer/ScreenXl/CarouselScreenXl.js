import { Button } from "@mantine/core";

import styles from "./styles_bc.module.scss";

import { useSwiperSlide } from 'swiper/react';

import './styles.css';

const CarouselScreenXl = (props) => {

  const {
    urlImage,
    description,
    id,
    title
  } = props;

  const swiperSlide = useSwiperSlide();


  // swiperSlide.isActive
  return (
    <div className={styles.container}>
      <div className="w-full flex flex-row">


          <div className={styles.content}>
            <span className={
              swiperSlide.isActive ? "animate__animated animate__bounce  animate__delay-2s" : ""
            }>sadsadasdsa</span>
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

      <div className={styles.containerImage}>
        <img src={urlImage} alt="alt" className={styles.image} />
      </div>

    </div>
  );
};

export default CarouselScreenXl;
