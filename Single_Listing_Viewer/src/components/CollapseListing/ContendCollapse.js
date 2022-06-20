import React from 'react'
// mantine
import { Box, Divider, Text } from '@mantine/core';
// css
import styles from './styles.cl.module.scss'

const ContendCollapse = () => {
    const defaultContend = [
        {
            title: 'Kitchen',
            descriptio: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora exercitationem molestiae alias i Tempora exercitationem molestiae alias i'
        },
        {
            title: 'Appliances',
            descriptio: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit'
        },
        {
            title: 'Laundry Room',
            descriptio: 'Lorem, ipsum'
        },
        {
            title: 'Bathrooms',
            descriptio: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit'
        }
    ]

    return (
        <Box className={styles.gridContendCollapse}>
            <div />
            <Box className={styles.containerConted}>
                <Divider my="sm" />
                {
                    defaultContend.map((value, index) => (
                        <>
                            <Box className={styles.boxContend} key={index}>
                                <Text component='span'>
                                    <strong>{value.title}</strong>
                                </Text>
                                <Text component='p'>{value.descriptio}</Text>
                            </Box>
                            {
                                (index < defaultContend.length - 1) && (
                                    <Divider my="sm" />
                                )
                            }

                        </>
                    ))
                }
            </Box>
        </Box>
    )
}

export default ContendCollapse