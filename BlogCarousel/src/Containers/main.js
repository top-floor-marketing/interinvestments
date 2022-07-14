import React from "react";

// components
import SkeletonBlog from "../Components/SkeletonBlog";
import CarouselContainer from "../Components/CarouselContainer";
import EmptyBlog from "../Components/Empty";

import useGetBlogs from "../Hooks/useGetBlogs";

import styles from "./styles_bc.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './swiperOverride.css';

const MainContainer = () => {
  const { isLoading, isEmpty, isError, data } = useGetBlogs();
  const allProps = {
    container: {
      className: styles.container,
    },
    carouselBlog: {
      listBlogs: data,
    },
  };

  return (
    <div id="blogCarouselContainer" data-aos="fade-up" data-aos-duration="700" {...allProps.container}>
      {(isError || isEmpty) && !isLoading ? (
        <EmptyBlog />
      ) : isLoading ? (
        <SkeletonBlog />
      ) : (
        <CarouselContainer {...allProps.carouselBlog} />
      )}
    </div>
  );
};

export default MainContainer;
