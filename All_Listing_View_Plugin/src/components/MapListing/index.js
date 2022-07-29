import React, { useState, useEffect } from 'react'
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
    const [defaultPropsMap, setDefaultProps] = useState({
        lat: 25.761681,
        lng: -80.191788
    })
    const { isLoading } = props
    const { mapApiKey, dataListing } = useSelector((state) => state.statusQuery)

    useEffect(() => {
        if (dataListing.length) {
            const { latitude, longitude } = dataListing[0].listingData.newDevelopment
            setDefaultProps({
                lat: parseFloat(latitude),
                lng: parseFloat(longitude)
            })
        }
    }, [dataListing])

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
                defaultCenter={defaultPropsMap}
                defaultZoom={11}
            >
                {
                    dataListing.map((value, index) => {
                        const { latitude, longitude, priceMin = 0, priceMax = 0, photos } = value.listingData.newDevelopment
                        return (
                            <Marker
                                uri={value.uri}
                                title={value.title}
                                subTitle={value.neighborhoods.nodes[0]?.name}
                                price={`$${priceMin} - $${priceMax}`}
                                key={index}
                                lat={latitude}
                                lng={longitude}
                                urlImagen={photos[0]?.sourceUrl}
                            />
                        )
                    })
                }

            </GoogleMapReact>

        </Box>
    )
}

export default MapListing