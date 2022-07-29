import React from 'react'
// componet
import Marker from './Marker'
//mantine
import { Box } from '@mantine/core';
// map
import GoogleMapReact from 'google-map-react';
import stylesmaps from './stylesmaps'
// css
import styles from './styles.ml.module.scss'

const MapComp = (props) => {
    const { dataListing, optionTheme } = props
    const { latitude, longitude } = dataListing

    const defaultProps = {
        center: {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude)
        },
    };
    // console.log('defaultProps', defaultProps)
    // console.log("dataListingMap", dataListing)
    return (
        <Box className={styles.BoxMap}>
            <GoogleMapReact
                options={{
                    styles: stylesmaps,
                    scrollwheel: false,
                    gestureHandling: "greedy",
                    fullscreenControl: false,
                    zoomControl: false
                }}
                bootstrapURLKeys={{ key: optionTheme.mapApiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={15}
            >
                {
                    <Marker
                        uri={dataListing.uri}
                        title={dataListing.title}
                        subTitle={dataListing.neighborhoods[0]?.name}
                        price={`$${dataListing.priceMin} - $${dataListing.priceMax}`}
                        lat={parseFloat(latitude)}
                        lng={parseFloat(longitude)}
                        urlImagen={dataListing.photos[0]?.sourceUrl}
                    />
                }
            </GoogleMapReact>
        </Box>
    )
}

export default MapComp
// api key google maps
/// AIzaSyBzy7z6wmop9ROv42s6-Rt244ZHJjOIdV0