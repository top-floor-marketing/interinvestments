import React from 'react'
// mantine
import { Box, Button } from '@mantine/core';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// css 
import styles from './styles.cl.module.scss'
import './stylesPagination.css'

const CarucelListing = (props) => {
    SwiperCore.use([Autoplay]);
    const paginationCustom = {
        clickable: true,
        renderBullet: function (_, className) {
            return `<span class=${className}></span>`;
        }
    };

    const { data } = props
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)

    const ImageCarucel = (value, index) => {
        switch (index) {
            case 0:
                return (
                    <SwiperSlide key={index} className={styles.containerImage}>
                        <img
                            data-aos-once="true"
                            data-aos-delay="300"
                            data-aos-duration='2000'
                            data-aos="fade-down"
                            className={styles.imageCarucel}
                            alt={`ImageCarucel_${index}`}
                            src={value.sourceUrl}
                        />
                    </SwiperSlide>
                )
            case 1:
                return (
                    <SwiperSlide key={index} className={styles.containerImage}>
                        <img
                            data-aos-once="true"
                            data-aos-duration='2000'
                            data-aos="fade-left"
                            data-aos-delay="1100"
                            className={styles.imageCarucel}
                            alt={`ImageCarucel_${index}`}
                            src={value.sourceUrl}
                        />
                    </SwiperSlide>
                )
            case data.photos.length - 1:
                return (
                    <SwiperSlide key={index} className={styles.containerImage}>
                        <img
                            data-aos-once="true"
                            data-aos-duration='2000'
                            data-aos-delay="700"
                            data-aos="fade-right"
                            className={styles.imageCarucel}
                            alt={`ImageCarucel_${index}`}
                            src={value.sourceUrl}
                        />
                    </SwiperSlide>
                )
            default: return (
                <SwiperSlide key={index} className={styles.containerImage}>
                    <img
                        className={styles.imageCarucel}
                        alt={`ImageCarucel_${index}`}
                        src={value.sourceUrl}
                    />
                </SwiperSlide>
            )

        }
    }

    return (
        <Box className={styles.BoxCarucel}>
            <Box className={styles.containerCarucel}>
                <Box className={`z-10 ${styles.containerNavigation}`}>
                    <Button
                        variant="outline"
                        ref={navigationPrevRef}
                        className={styles.ButtonCarucel}
                        size="2xl"
                        compact
                    >
                        <ChevronLeft
                            size={28}
                            color='white'
                            strokeWidth={1}
                        />
                    </Button>
                    <Button
                        variant="outline"
                        ref={navigationNextRef}
                        className={styles.ButtonCarucel}
                        size="2xl"
                        compact
                    >
                        <ChevronRight
                            size={28}
                            color='white'
                            strokeWidth={1}
                        />
                    </Button>
                </Box>
                <Swiper
                    speed={1500}
                    autoplay={{ delay: 8000 }}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    onSwiper={(swiper) => {
                        // Delay execution for the refs to be defined
                        setTimeout(() => {
                            // Override prevEl & nextEl now that refs are defined
                            swiper.params.navigation.prevEl = navigationPrevRef.current
                            swiper.params.navigation.nextEl = navigationNextRef.current

                            // Re-init navigation
                            swiper.navigation.destroy()
                            swiper.navigation.init()
                            swiper.navigation.update()
                        })
                    }}
                    effect={"coverflow"}
                    grabCursor={true}
                    loop={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 80,
                        depth: 550,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={paginationCustom}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                >
                    {
                        data.photos.map((value, index) => ImageCarucel(value, index))
                    }
                </Swiper>
            </Box>
        </Box >
    )
}

export default CarucelListing