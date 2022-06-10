import React from "react";
import { useMediaQuery } from "@mantine/hooks";

// components
import SkeletonBlog from "../Components/SkeletonBlog";
import CarouselContainer from "../Components/CarouselContainer";
import EmptyBlog from "../Components/Empty";

import useGetBlogs from "../Hooks/useGetBlogs";

import styles from "./styles.cb.module.scss";

const MainContainer = () => {
  const isMobileScreen = useMediaQuery(
    "only screen and (max-width: 1080px)",
    false
  );
  const { isLoading, isEmpty, isError, data } = useGetBlogs();
  const allProps = {
    container: {
      className: styles.container,
    },
    carouselBlog: {
      isMobileScreen,
      listBlogs: data,
    },
  };

  return (
    <div data-aos="fade-up" data-aos-duration="700" {...allProps.container}>
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
