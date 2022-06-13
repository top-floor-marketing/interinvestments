import React from 'react'
// components
import HeroParalax from '../HeroParalax'
import DescriptionListing from '../DescriptionListing';
import DataLIsting from '../DataLIsting'
import CarucelListing from '../CarucelListing'
// mantine
import { Box } from '@mantine/core';

const Main = () => {
    return (
        <Box>
            <HeroParalax />
            <DescriptionListing />
            <DataLIsting />
            <CarucelListing />
        </Box>
    )
}

export default Main