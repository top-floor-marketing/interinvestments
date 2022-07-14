import PropTypes from "prop-types";
import { Button } from "@mantine/core";
import { ChevronDown, ChevronUp } from "tabler-icons-react";
import CarouselScreenXl from "./ScreenXl/CarouselScreenXl";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

import './stylesChevron.css';

const CarouselContainer = (props) => {
  const { listBlogs, isMobileScreen } = props;

  const pagination = {
    el: '#blogCustomPaginationIndicator',
    clickable: true,
    renderBullet: (index, className) => {
      let componentRender = "";
      switch(parseInt(index)) {
        case 0: 
        componentRender = `
        <div class="flex flex-col gap-5">
          <div class="${className} blog-chevron-up">
           
          </div>
          <div class="${className} blog-item-indicador">
           
          </div>
        <div> 
        `
        break;
        case 1: 
        componentRender = '<span class="' + className + '">' + (index + 1) + "</span>"
        break;
        case 2: 
        componentRender = '<span class="' + className + '">' + (index + 1) + "</span>"
        break;
        case 3: 
        componentRender = `
        <div class="${className} h-full w-full blog-chevron-down">
         
        </div>
      `
        break;
        default:
          componentRender = '<span class="' + className + '">' + (index + 1) + "</span>"
      }
      return componentRender;
    },
  };

  const allProps = {
    carouselScreenXl: {
      totalData: listBlogs.length,
    },
  };

  return (
    <div className="w-full flex flex-row bg-white" >
      <div id="blogCustomPaginationIndicator" className="min-w-[50px] h-fit bg-white my-auto">
      </div>
      <div className="w-full h-full">
        <Swiper
          direction={"vertical"}
          /* autoplay={{
            delay: 8000,
            disableOnInteraction: true,
          }} */
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