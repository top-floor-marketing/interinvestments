import React from 'react'
// mantine dev
import { Box, Skeleton } from '@mantine/core';

const LoaderMaps = () => {
    return (
        <Box className='flex items-center w-full h-full gap-4 px-4'>
            <Skeleton className='w-full h-[640px]  lg:h-inherit' />
        </Box>
    )
}

export default LoaderMaps