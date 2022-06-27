import React from 'react'
// mantine
import { Box, Divider, Text } from '@mantine/core';
// css
import styles from './styles.cl.module.scss'

const ContendCollapse = (props) => {
    const defaultContend = [
        {
            title: 'Kitchen',
            value: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora exercitationem molestiae alias i Tempora exercitationem molestiae alias i'
        },
        {
            title: 'Appliances',
            value: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit'
        },
        {
            title: 'Laundry Room',
            value: 'Lorem, ipsum'
        },
        {
            title: 'Bathrooms',
            value: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit'
        }
    ]

    const { data = defaultContend } = props

    return (
        <Box className={styles.gridContendCollapse}>
            <div />
            <Box className={styles.containerConted}>
                <Divider my="sm" />
                {
                    data.map((value, index) => (
                        <Box key={index}>
                            <Box className={styles.boxContend}>
                                <Text component='span'>
                                    <strong>{value.title}</strong>
                                </Text>
                                <Text component='p'>{value.value ? value.value : 'n/a'}</Text>
                            </Box>
                            {
                                (index < data.length - 1) && (
                                    <Divider my="sm" />
                                )
                            }
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default ContendCollapse