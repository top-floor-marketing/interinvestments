import React from 'react'
//mantine
import { Box } from '@mantine/core';
// map
import GoogleMapReact from 'google-map-react';
import stylesmaps from './stylesmaps'
// redux
import { useSelector } from 'react-redux'

const MapListing = () => {
    const { mapApiKey } = useSelector((state) => state.statusQuery)
    console.log('mapApiKey', mapApiKey)

    const defaultProps = {
        center: {
            lat: 25.761681,
            lng: -80.191788
        },
        zoom: 11
    };


    return (
        <Box className='w-full h-full'>
            <GoogleMapReact
                options={{
                    styles: stylesmaps
                }}
                bootstrapURLKeys={{ key: mapApiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            />
        </Box>
    )
}

export default MapListing