import React from 'react'
// components
import HeroParalax from '../HeroParalax'
import DescriptionListing from '../DescriptionListing';
import DataLIsting from '../DataLIsting'
// mantine
import { Box } from '@mantine/core';

const Main = () => {
    return (
        <Box>
            <HeroParalax />
            <DescriptionListing />
            <DataLIsting />
        </Box>
    )
}

export default Main