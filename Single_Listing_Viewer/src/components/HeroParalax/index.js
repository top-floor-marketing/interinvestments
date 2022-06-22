import React from 'react'
import imagenPalarax from '../../assets/img/Hero_Image.jpg'
import chevron_down from '../../assets/img/chevron_down.svg'
// css
import styles from "./styles.hp.module.scss";
// mantine
import { Box, Text } from '@mantine/core';

const HeroParalax = () => {
    return (
        <Box className='relative w-full h-full'>
            <Box style={{ zIndex: 1 }} className={`${styles.ParallaxCroma}`} />
            <Box
                style={{ backgroundImage: `url(${imagenPalarax})` }}
                className={styles.BoxImagenParalax}
            >
                <div style={{ zIndex: 1 }} className={styles.containerParalax}>
                    <Text
                        data-aos-once="true"
                        data-aos-duration='2000'
                        data-aos="zoom-out-up"
                        component='h2'
                    >
                        Waldorf Astoria
                        <br />
                        <Text component='span'>
                            Downtown Miami &nbsp;&nbsp; • &nbsp; $300,000 &nbsp;&nbsp; • &nbsp; $12,000/mo
                        </Text>
                    </Text>
                    <Text component='span' className={styles.icon}>
                        <img className={styles.imagechevron_down} src={chevron_down} alt="Imagechevron_down" />
                    </Text>
                </div>
            </Box>
        </Box>
    )
}

export default HeroParalax