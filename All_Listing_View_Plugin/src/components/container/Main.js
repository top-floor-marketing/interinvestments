import React from 'react'
// components
import FiltersListings from '../FiltersListings'
import { SkeletonGrid, LoaderMaps } from '../LoadingListing'
// Hooks
import { useGetFeaturedDev } from '../../Hooks'
// mantine
import { Box, ScrollArea, Header, AppShell } from '@mantine/core';
// styles
import style from '../../styles.ALV.module.scss'

const Main = () => {
    // usar hook, validar error o skeleton
    const { isLoading, isError } = useGetFeaturedDev()

    return (
        <AppShell
            className={style.containerMain}
            header={
                <Header fixed>
                    <FiltersListings />
                </Header>
            }
        >
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
                    {
                        (isLoading && !isError) ? (
                            <SkeletonGrid />
                        ) : (
                            <p>data true</p>
                        )
                    }

                </Box>
                <Box className='flex items-center justify-center w-full gap-3 lg:w-3/5'>
                    {
                        (isLoading && !isError) ? (
                            <LoaderMaps />
                        ) : (
                            <p>data true</p>
                        )
                    }
                </Box>
            </Box>
        </AppShell>
    )
}

export default Main