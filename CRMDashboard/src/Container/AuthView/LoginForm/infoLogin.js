import { Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

import { useRef, useState } from 'react';

import slider1 from './assets/images/Slider1.jpg';
import slider2 from './assets/images/Slider2.jpg';
import slider3 from './assets/images/Slider3.jpg';
import slider4 from './assets/images/Slider4.jpg';

import useStyles from './stylesInfoLogin';

const InfoLogin = () => {
  const { classes } = useStyles();
  const autoplay = useRef(Autoplay({ delay: 7000 }));
  const [, setEmbla] = useState(null);
  let IMAGES = [slider1, slider2, slider3, slider4];
  IMAGES.sort(() => Math.random() - 0.5);
  const slides = IMAGES.map((url) => (
    <Carousel.Slide key={url}>
      <img src={url} alt="crmLogin" />
    </Carousel.Slide>
  ));

  return (
    <Box className={classes.containerInfoLogin}>
    <Carousel
        maw={400}
        mx='auto'
        speed={1200}
        height={"100%"}
        slideSize={'100%'}
        loop
        draggable
        withControls={false}
        initialSlide={0}
        getEmblaApi={setEmbla}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        sx={{ flex: 1 }}
        styles={{
            viewport: {
                borderRadius: "10px"
            },
            slide: {
                borderRadius: "10px",
                maxHeight: "450px"
            }
        }}
      >

      </Carousel>
    </Box>
  );
};
export default InfoLogin;
