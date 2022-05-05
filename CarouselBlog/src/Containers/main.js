import React from "react";
import { useMediaQuery } from "@mantine/hooks";

// components
import SkeletonBlog from "../Components/SkeletonBlog";
import CarouselBlog from "../Components/CarouselBlog";

import useGetBlogs from "../Hooks/useGetBlogs";

import styles from "./styles.module.scss";

const MainContainer = () => {
  const isMobileScreen = useMediaQuery(
    "only screen and (max-width: 640px)",
    false
  );

  const { isLoading } = useGetBlogs();

  const allProps = {
    container: {
      className: styles.container,
    },
    carouselBlog: {
      isMobileScreen,
    },
  };

  return (
    <div data-aos="fade-up" data-aos-duration="700" {...allProps.container}>
      {isLoading ? (
        <SkeletonBlog />
      ) : (
        <CarouselBlog {...allProps.carouselBlog} />
      )}
    </div>
  );
};

export default MainContainer;
