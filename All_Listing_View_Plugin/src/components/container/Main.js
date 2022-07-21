import React from 'react'
// components
import FiltersListings from '../FiltersListings'
import { SkeletonGrid, LoaderMaps } from '../LoadingListing'
import MapListing from '../MapListing'
import GridListing from '../GridListing'
import AlertError from '../AlertError'
// Hooks
import { useGetFeaturedDev } from '../../Hooks'
// mantine
import { Box, ScrollArea, Header, AppShell } from '@mantine/core';
// styles
import style from '../../styles.ALV.module.scss'

const Main = () => {
    // usar hook, validar error o skeleton
    const { isLoading, isError } = useGetFeaturedDev()

    if (isError) {
        return (
            <Box className='flex items-center justify-center w-full h-screen'>
                <AlertError
                    label='Error!'
                    description='Please wait a few minutes before you try again'
                />
            </Box>
        )
    }

    return (
        <AppShell
            className={style.containerMain}
            classNames={{
                main: 'p-[20px] pb-0 lg:pl-[20px] lg:pr-0 lg:pt-0 mt-[200px] md:mt-[88px]'
            }}
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
                        viewport: 'pr-0 md:pr-4',
                        thumb: 'bg-[#FFB839]'
                    }}
                >
                    {
                        (isLoading && !isError) ? (
                            <SkeletonGrid />
                        ) : (
                            <GridListing />
                        )
                    }

                </Box>
                <Box className={style.containerMap}>
                    {
                        (isLoading && !isError) ? (
                            <LoaderMaps />
                        ) : (
                            <MapListing />
                        )
                    }
                </Box>
            </Box>
        </AppShell>
    )
}

export default Main