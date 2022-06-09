import React from 'react'
// components
import HeroParalax from '../HeroParalax'
import DescriptionListing from '../DescriptionListing';
// mantine
import { Box } from '@mantine/core';

const Main = () => {
    return (
        <Box>
            <HeroParalax />
            <DescriptionListing />
        </Box>
    )
}

export default Main