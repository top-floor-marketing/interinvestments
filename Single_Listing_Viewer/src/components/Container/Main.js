import React, { useState } from 'react'
// components
import HeroParalax from '../HeroParalax'
import DescriptionListing from '../DescriptionListing';
import DataLIsting from '../DataLIsting'
import CarucelListing from '../CarucelListing'
import CollapseListing from '../CollapseListing'
import MapListing from '../MapListing'
// Hoc
import ListingWrapper from '../Hoc/ListingWrapper'

const Main = () => {
    const [valueListing, setValueListing] = useState(null)

    console.log('valueListing', valueListing)
    return (
        <ListingWrapper
            setValueListing={setValueListing}
        >
            <HeroParalax
                data={valueListing?.listingData.newDevelopment}
            />
            <DescriptionListing />
            <DataLIsting />
            <CarucelListing />
            <CollapseListing />
            <MapListing />
        </ListingWrapper>
    )
}

export default Main