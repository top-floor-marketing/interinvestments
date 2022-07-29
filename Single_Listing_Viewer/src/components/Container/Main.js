import React, { useState } from 'react'
// components
import HeroParalax from '../HeroParalax'
import DescriptionListing from '../DescriptionListing';
import DataLIsting from '../DataLIsting'
import CarucelListing from '../CarucelListing'
import CollapseListing from '../CollapseListing'
import MapListing from '../MapListing'
import VideoListing from '../VideoListing'
// Hoc
import ListingWrapper from '../Hoc/ListingWrapper'

const Main = () => {
    const [valueListing, setValueListing] = useState(null)
    const [optionTheme, setOptionTheme] = useState(null)

    // console.log('valueListing', valueListing)
    return (
        <ListingWrapper
            valueListing={valueListing}
            setValueListing={setValueListing}
            setOptionTheme={setOptionTheme}
        >
            <HeroParalax
                data={{
                    ...valueListing?.listingData.newDevelopment,
                    title: valueListing?.title,
                    neighborhoods: valueListing?.neighborhoods.nodes
                }}
            />
            <DescriptionListing
                data={{
                    ...valueListing?.listingData.newDevelopment,
                }}
            />
            <DataLIsting
                data={{
                    ...valueListing?.listingData.newDevelopment,
                }}
            />
            <CarucelListing
                data={{
                    ...valueListing?.listingData.newDevelopment,
                }}
            />
            <CollapseListing
                data={{
                    address: valueListing?.address.address,
                    floorplans: valueListing?.floorplans.floorplans,
                    team: valueListing?.team.team,
                }}
            />
            <VideoListing
                data={{
                    ...valueListing?.listingData.newDevelopment,
                }}
            />
            <MapListing
                data={{
                    ...valueListing?.listingData.newDevelopment,
                    uri: valueListing?.uri,
                    title: valueListing?.title,
                    neighborhoods: valueListing?.neighborhoods.nodes
                }}
                optionTheme={optionTheme}
            />
        </ListingWrapper>
    )
}

export default Main