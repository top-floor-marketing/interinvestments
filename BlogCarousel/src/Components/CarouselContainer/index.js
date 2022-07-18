import PropTypes from "prop-types";
import { useRef, useCallback, useState, useEffect } from "react";
import CarouselScreenXl from "./ScreenXl/CarouselScreenXl";

import { Swiper, SwiperSlide } from "swiper/react";

import CustomIndicator from "../CustomIndicator";

const CarouselContainer = (props) => {
  const { listBlogs } = props;

  // Swiper instance
  const swiperRef = useRef(null);

  // Slides current index
  const [currentIndex, updateCurrentIndex] = useState(0);

  const allProps = {
    carouselScreenXl: {
      totalData: listBlogs.length,
    },
  };

  const updateIndex = useCallback(
    () => updateCurrentIndex(swiperRef.current.swiper.realIndex),
    []
  );

  // Manipulate swiper from outside
  const nextBlog = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const prevBlog = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const specificBlog = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(parseInt(index));
    }
  }

  // Add eventlisteners for swiper after initializing
  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    if (swiperInstance) {
      swiperInstance.on("slideChange", updateIndex);
    }
    return () => {
      if (swiperInstance) {
        swiperInstance.off("slideChange", updateIndex);
      }
    };
  }, [updateIndex]);

  return (
    <div className="w-full flex flex-row bg-white" >
      <div id="blogCustomPaginationIndicator" className="min-w-[50px] h-fit bg-white my-auto">
        <CustomIndicator specificBlog={specificBlog} activeBlog={currentIndex} nextBlog={nextBlog} prevBlog={prevBlog} totalData={listBlogs.length} />
      </div>
      <div className="w-full h-full">
        <Swiper
          ref={swiperRef}
          direction={"vertical"}
          mousewheel={false}
          pagination={{
            el: "#blogCustomPaginationIndicator",
            clickable: true
          }}
          draggable={false}
          slidesPerView={1}
          loop={true}
        >
          {listBlogs.map((val, index) => {
            return (
              <SwiperSlide key={index}>
                <CarouselScreenXl {...val} {...allProps.carouselScreenXl} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  )
};

CarouselContainer.propTypes = {
  isMobileScreen: PropTypes.bool,
  listBlogs: PropTypes.array,
};

export default CarouselContainer;
