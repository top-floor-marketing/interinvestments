import React from 'react'
// mantine
import { Box, Divider, Text, Group } from '@mantine/core';
import { Download } from 'tabler-icons-react';
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

    const { data = defaultContend, description, typeComponentValue } = props

    return (
        <Box className={styles.gridContendCollapse}>
            <Box />
            <Box className={styles.containerConted}>
                {
                    (description) && (
                        <Box>
                            <Box className={styles.boxContend}>
                                <Text component='span'>
                                    <strong>Description</strong>
                                </Text>
                                <Text
                                    title={description}
                                    lineClamp={3}
                                    component='p'
                                >
                                    {description}
                                </Text>
                            </Box>
                        </Box>
                    )
                }

                <Divider my="sm" />
                {
                    data.map((value, index) => (
                        <Box key={index}>
                            <Box className={styles.boxContend}>
                                <Text component='span'>
                                    <strong>{value.title}</strong>
                                </Text>
                                {
                                    typeComponentValue === 'link' ? (
                                        <Group spacing="xs" style={{ alignItems: 'center' }} className={styles.linkFloorPlans}>
                                            <Text
                                                style={{ lineHeight: '17px' }}
                                                target="_blank"
                                                href={value.value}
                                                download={`${value.title}`}
                                                component='a'
                                            >
                                                {value.value ? "Link pdf" : 'n/a'}
                                            </Text>
                                            <Download size={16} />
                                        </Group>
                                    ) : (
                                        <Text component='p'>{value.value ? value.value : 'n/a'}</Text>
                                    )
                                }
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