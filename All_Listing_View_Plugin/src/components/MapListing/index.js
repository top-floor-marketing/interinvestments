import React from 'react'
//mantine
import { Box, Overlay } from '@mantine/core';
// components
import Marker from './Marker'
// map
import GoogleMapReact from 'google-map-react';
import stylesmaps from './stylesmaps'
// redux
import { useSelector } from 'react-redux'
// styles 
import style from './styles.ML.module.scss'

const MapListing = (props) => {
    const { isLoading } = props
    const { mapApiKey } = useSelector((state) => state.statusQuery)

    const defaultProps = {
        center: {
            lat: 25.761681,
            lng: -80.191788
        },
        zoom: 11
    };

    return (
        <Box className='relative w-full h-full'>
            {
                (isLoading) && (
                    <Overlay
                        className={style.overlayMapListing}
                        opacity={0}
                        color="#000"
                        zIndex={100}
                    />
                )
            }
            <GoogleMapReact
                options={{
                    styles: stylesmaps
                }}
                bootstrapURLKeys={{ key: mapApiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <Marker
                    lat={25.761681}
                    lng={-80.191788}
                />
            </GoogleMapReact>

        </Box>
    )
}

export default MapListing