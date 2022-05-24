import React from "react";
import { Carousel } from "react-responsive-carousel";
// css
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./stylesCarucel.css";
// mantine
import { Box } from "@mantine/core";
// mantine
import { useMediaQuery } from "@mantine/hooks";
// assets
import fondoLogin from "./assets/images/fondoLogin.jpg";
import fondoLogin2 from "./assets/images/fondoLogin2.jpg";
import fondoLogin3 from "./assets/images/fondoLogin3.jpg";

const CarouselLogin = () => {
  const matches = useMediaQuery("(min-width: 1024px)");
  return (
    <Box className="containCarousel">
      {matches && (
        <Carousel
          showStatus={false}
          autoPlay={true}
          interval={10000}
          showIndicators={false}
          showArrows={false}
          showThumbs={false}
          transitionTime={1000}
          infiniteLoop
          className="CarouselLogin_wp"
        >
          <img
            src={fondoLogin}
            className="Interinvestments_img"
            alt="InterinvestmentsLogin1"
          />
          <img
            src={fondoLogin2}
            className="Interinvestments_img"
            alt="InterinvestmentsLogin2"
          />
          <img
            src={fondoLogin3}
            className="Interinvestments_img"
            alt="InterinvestmentsLogin3"
          />
        </Carousel>
      )}
    </Box>
  );
};

export default CarouselLogin;
