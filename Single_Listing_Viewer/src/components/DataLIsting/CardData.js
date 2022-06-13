import React from 'react'
// mantine
import { Box, Text } from '@mantine/core';
// css
import styles from './styles.dl.module.scss'
// react-spring
import { useSpring, animated } from 'react-spring';

const CardData = (props) => {
    const {
        number = 0,
        type = 'text',
        durationAnimation = '2000',
        description = 'Lorem ipsum dolor sit amet, consectetuer adipiscing'
    } = props

    const propsSpring = useSpring({ val: number, from: { val: 0 }, config: { duration: 2000 } });

    return (
        <Box
            data-aos-once="false"
            data-aos-duration={durationAnimation}
            data-aos="zoom-in"
            className={styles.containerCard}
        >
            <Box className='flex'>
                <Text component='span' className={styles.titleCard}>
                    {
                        type === 'number' && '$'
                    }
                </Text>
                <Text component='p' className={styles.titleCard}>
                    <animated.span>
                        {
                            propsSpring.val.interpolate(val => Math.floor(val))
                        }
                    </animated.span>
                </Text>
            </Box>
            <Text
                className={styles.descriptionCard}
                component='span'
            >
                {description}
            </Text>
        </Box>
    )
}

export default CardData

/// https://levelup.gitconnected.com/create-a-number-animation-with-react-spring-670975daa28d
