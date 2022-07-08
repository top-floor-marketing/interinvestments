import React from 'react'
//mantine
import { Box } from '@mantine/core';
// import { useMediaQuery } from '@mantine/hooks';
// map
import GoogleMapReact from 'google-map-react';
// import pinMap from '../../assets/pinMap.svg'
// import pinMapHover from '../../assets/pinMapHover.svg'
// css
import styles from './styles.ml.module.scss'

// const TokenMAp = process.env.REACT_APP_TFM_TOKEN_MAP

const MapComp = (props) => {
    const { dataListing, optionTheme } = props
    let { latitude, longitude } = dataListing
    parseFloat(latitude)
    parseFloat(longitude)

    console.log('optionThemeINMap', optionTheme)
    console.log("dataListing", dataListing)

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    const AnyReactComponent = ({ text }) => <div>{text}</div>;

    return (
        <Box className={styles.BoxMap}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBzy7z6wmop9ROv42s6-Rt244ZHJjOIdV0" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        </Box>
    )
}

export default MapComp
// api key google maps
/// AIzaSyBzy7z6wmop9ROv42s6-Rt244ZHJjOIdV0