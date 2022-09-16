import React from 'react'
// mantine
import { Box, Divider, Text, Group } from '@mantine/core';
import { Download } from 'tabler-icons-react';
// css
import styles from './styles.cl.module.scss'
// utilst
import isArray from 'lodash/isArray';


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
            <Box />
            <Box className={styles.containerConted}>
                {
                    data.map((value, index) => (
                        <Box key={index}>
                            <Box className={styles.boxContend}>
                                {
                                    (value.value) && (
                                        isArray(value.value) ? (
                                            <>
                                                <Text component='span'>
                                                    <strong>{value.title}</strong>
                                                </Text>
                                                <Box className={styles.containerFloorplasPdf}>
                                                    {
                                                        value.value.map((itemPdf, index) => (
                                                            <Group
                                                                key={`${itemPdf.pdf.title}_${index}`}
                                                                spacing="xs"
                                                                style={{ alignItems: 'center' }}
                                                                className={styles.linkFloorPlans}
                                                            >
                                                                <Download size={16} />
                                                                <Text
                                                                    style={{ lineHeight: '17px' }}
                                                                    target="_blank"
                                                                    href={itemPdf.pdf.mediaItemUrl}
                                                                    download={`${itemPdf.pdf.title}`}
                                                                    component='a'
                                                                >
                                                                    {itemPdf.pdf.title}
                                                                </Text>
                                                            </Group>
                                                        ))
                                                    }
                                                </Box>
                                            </>
                                        ) : (
                                            <>
                                                <Text component='span'>
                                                    <strong>{value.title}</strong>
                                                </Text>
                                                <Text component='p'>{value.value}</Text>
                                            </>
                                        )
                                    )
                                }
                            </Box>
                            {
                                (value.value) && (
                                    (index < data.length - 1) && (
                                        <Divider my="sm" />
                                    )
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