import React from 'react'
// components
import HeroParalax from '../HeroParalax'
import DescriptionListing from '../DescriptionListing';
import DataLIsting from '../DataLIsting'
import CarucelListing from '../CarucelListing'
import CollapseListing from '../CollapseListing'
import MapListing from '../MapListing'

const Main = () => {
    return (
        <>
            <HeroParalax />
            <DescriptionListing />
            <DataLIsting />
            <CarucelListing />
            <CollapseListing />
            <MapListing />
        </>
    )
}

export default Main