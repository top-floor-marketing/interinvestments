import React from 'react'
// mantine
import { Box, Text } from '@mantine/core';
// css
import styles from './styles.dl.module.scss'
// react-spring
import { useSpring, animated } from 'react-spring';
// utils
import { numFormatter } from '../../utils'

const CardData = (props) => {
    const {
        number = 0,
        type = 'text',
        durationAnimation = '2000',
        description = 'Lorem ipsum dolor sit amet, consectetuer adipiscing',
    } = props

    const newNumber = type === 'text' ? number : numFormatter(number)

    const propsSpring = useSpring(
        {
            delay: 600,
            val: type === 'number' ? newNumber.number : 0,
            from: { val: 0 },
            config: { duration: 1200 }
        }
    );

    return (
        <Box
            data-aos-once="true"
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

                {
                    type === 'text' ? (
                        <Text component='p' className={styles.titleCard}>
                            {number}
                        </Text>
                    ) : (
                        <Text component='p' className={styles.titleCard}>
                            <animated.span>
                                {
                                    propsSpring.val.interpolate(val => Math.floor(val))
                                }
                            </animated.span>
                            {
                                newNumber.tag && (
                                    newNumber.tag
                                )
                            }
                        </Text>
                    )
                }

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

