import React from 'react'
// css
import styles from "./styles.hp.module.scss";
// mantine
import { Box, Text, Button } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
// utils
import { numFormatter } from '../../utils'

const HeroParalax = (props) => {
    const { data } = props
    return (
        <Box className='relative w-full h-full'>
            <Box style={{ zIndex: 1 }} className={`${styles.ParallaxCroma}`} />
            <Box
                style={{ backgroundImage: `url(${data.photos[0].sourceUrl})` }}
                className={styles.BoxImagenParalax}
            >
                <div style={{ zIndex: 1 }} className={styles.containerParalax}>
                    <Text
                        data-aos-once="true"
                        data-aos-duration='2000'
                        data-aos="zoom-out-up"
                        component='h2'
                    >
                        {data.title}
                        {
                            data.neighborhoods.length ? (
                                <>
                                    <br />
                                    <Text component='span'>
                                        {data.neighborhoods[0].name} &nbsp;&nbsp; • ${numFormatter(data.priceMin).number + numFormatter(data.priceMin).tag} &nbsp;&nbsp; • ${numFormatter(data.priceMax).number + numFormatter(data.priceMax).tag}
                                    </Text>
                                </>
                            ) : null
                        }
                    </Text>
                    <Text component='span' className={styles.icon}>
                        <Button
                            component='span'
                            style={{ marginBottom: '20px' }}
                            variant="outline"
                            className={styles.ButtonCarucel}
                            size="2xl"
                            compact
                        >
                            <ChevronDown
                                size={28}
                                color='white'
                                strokeWidth={1}
                            />
                        </Button>
                    </Text>
                </div>
            </Box>
        </Box >
    )
}

export default HeroParalax