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
import ListingWrapper from '../Hoc/ListingWrapper';
import get from 'lodash/get';

const Main = () => {
    
    const [valueListing, setValueListing] = useState(null)
    const [optionTheme, setOptionTheme] = useState(null)

    return (
        <ListingWrapper
            valueListing={valueListing}
            setValueListing={setValueListing}
            setOptionTheme={setOptionTheme}
        >
            <HeroParalax
                data={{
                    ...valueListing?.listingData.newDevelopment,
                    featuredImage: valueListing?.featuredImage,
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
                idListing={get(valueListing, ["databaseId"], null)}
                data={{
                    specs: valueListing?.listingData?.newDevelopment.specs,
                    finishes: valueListing?.listingData?.newDevelopment.finishes,
                    // address: valueListing?.address.address,
                    floorplans: valueListing?.floorplans?.floorplans,
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