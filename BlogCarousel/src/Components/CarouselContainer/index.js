import { useEffect } from "react";
import PropTypes from "prop-types";

import CarouselScreenXl from "./ScreenXl/CarouselScreenXl";
import CustomIndicator from '../CustomIndicator';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

import AOS from "aos";

const CarouselContainer = (props) => {
  const { listBlogs, isMobileScreen } = props;

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      console.log("className", className);
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const allProps = {
    carouselScreenXl: {
      totalData: listBlogs.length,
    },
    customIndicador: {
      totalData: listBlogs.length,
      nextBlog: () => {},
      prevBlog: () => {},
    }
  };

  return (
    <div className="w-full flex flex-row bg-white" >
     {/*  <div className="min-w-[50px] h-fit bg-white my-auto">
        <CustomIndicator {...allProps.customIndicador} />
      </div> */}
      <div className="w-full h-full">
        <Swiper
          direction={"vertical"}
          autoplay={{
            delay: 8000,
            disableOnInteraction: true,
          }}
          mousewheel={false}
          pagination={pagination}
          slidesPerView={1}
          loop={true}
          modules={[Autoplay, Pagination]}
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


/*  return (
   <div className="w-full h-screen bg-blue-500">
     <button className="button-wp-primary flex">
       Load More
       <ChevronRight />
     </button>
   </div>
 ); */