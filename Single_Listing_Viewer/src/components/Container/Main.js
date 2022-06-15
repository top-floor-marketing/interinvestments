import React from 'react'
// components
import HeroParalax from '../HeroParalax'
import DescriptionListing from '../DescriptionListing';
import DataLIsting from '../DataLIsting'
import CarucelListing from '../CarucelListing'
import CollapseListing from '../CollapseListing'

const Main = () => {
    return (
        <>
            <HeroParalax />
            <DescriptionListing />
            <DataLIsting />
            <CarucelListing />
            <CollapseListing />
        </>
    )
}

export default Main