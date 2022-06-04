import React from 'react'
//mantine
import { Divider, Box, Text } from '@mantine/core';
import { DatabaseOff } from 'tabler-icons-react';

//css
import styles from './styles.mqs.module.scss'

const CardListing = (props) => {
    const { data } = props

    if (data.length === 0) {
        <NoDataCard />
    }

    return (
        <Box className={(data.length >= 3) ? styles.containerMenu : 'h-full'}>
            {
                data.map((val, index) => {
                    const { newDevelopment } = val.listingData
                    return (
                        <Box
                            component='a'
                            href={val.uri}
                            className={styles.cardListing} key={index}
                        >
                            <Box className={styles.contendCardListing}>
                                {
                                    (newDevelopment.photos) ? (
                                        <img
                                            className={`${styles.imagenMenu} ${styles.imageListing}`}
                                            src={newDevelopment.photos[0].sourceUrl}
                                            alt={`ImageListing_${index}`}
                                        />
                                    ) : (
                                        <NoImagen />
                                    )
                                }
                                <Box style={{ height: 'inherit' }} className={styles.dataListing}>
                                    <Text component='h4' className={styles.titleListing}>
                                        {val.title}
                                    </Text>
                                    <div className='mt-auto'>
                                        <Text
                                            component='h3'
                                            className={`font-medium ${styles.decriptionListing}`}
                                        >
                                            {newDevelopment.nameOfDevelopment}
                                        </Text>
                                        <span
                                            className={`font-light ${styles.decriptionListing}`}
                                        >
                                            {`Price $ ${newDevelopment.priceMin}m`} - {`$ ${newDevelopment.priceMax}m`}
                                        </span>
                                    </div>
                                </Box>
                            </Box>
                            <Divider my="sm" />
                        </Box>
                    )
                })
            }
        </Box>
    )
}

const NoImagen = () => {
    return (
        <Box className={`${styles.NoImageBox} ${styles.imageListing}`}>
            <Text component='p'>
                No Image
            </Text>
        </Box>
    )
}


const NoDataCard = () => {
    return (
        <div className='nodata'>
            <DatabaseOff
                size={48}
                strokeWidth={2}
                color={'black'}
            />
            <p>No data</p>
        </div>
    )
}

export default CardListing