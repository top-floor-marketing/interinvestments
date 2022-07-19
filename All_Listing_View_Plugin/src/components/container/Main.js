import React from 'react'
// components
import FiltersListings from '../FiltersListings'
import { SkeletonGrid, LoaderMaps } from '../LoadingListing'
// mantine
import { Box, ScrollArea, Divider } from '@mantine/core';
// styles
import style from '../../styles.ALV.module.scss'

const Main = () => {
    return (
        <Box className={style.containerMain}>
            <Box className={style.containerFilters}>
                <FiltersListings />
                <Divider my="sm" />
            </Box>
            <Box className={style.containerContend}>
                <Box
                    component={ScrollArea}
                    className={style.containerGridCard}
                    classNames={{
                        root: 'h-[350px] lg:h-full lg:max-h-screen',
                        viewport: 'pr-0 md:pr-2',
                        thumb: 'bg-[#FFB839]'
                    }}
                >
                    <SkeletonGrid />
                </Box>
                <Box className='flex items-center justify-center w-full gap-3 lg:w-3/5'>
                    <LoaderMaps />
                </Box>
            </Box>
        </Box>
    )
}

export default Main