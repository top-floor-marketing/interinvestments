import React from 'react'
// mantine dev
import { Loader, Box, Text } from '@mantine/core';

const LoaderMaps = () => {
    return (
        <Box className='flex items-center gap-4'>
            <Text component='p'>Loading Mapt</Text>
            <Loader color="yellow" size="xl" />
        </Box>

    )
}

export default LoaderMaps