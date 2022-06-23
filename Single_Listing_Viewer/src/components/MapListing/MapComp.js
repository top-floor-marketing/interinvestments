import React, { useState } from 'react'
//mantine
// import { Popper, Button, Paper, Center, Group, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
// map
import ReactMapGL, { Marker } from "react-map-gl";
import pinMap from '../../assets/pinMap.svg'
// import pinMapHover from '../../assets/pinMapHover.svg'
// css
import styles from './styles.ml.module.scss'

const TokenMAp = process.env.REACT_APP_TFM_TOKEN_MAP

const MapComp = (props) => {
    // const [isHoverPin, setIsShownHoverPin] = useState(false);
    // const [isActivePin, setIsActivePin] = useState(false)
    // const [referenceElement, setReferenceElement] = useState(null);
    const matches = useMediaQuery('(min-width: 1024px)');
    const { dataListing } = props
    let { latitude, longitude } = dataListing
    parseFloat(latitude)
    parseFloat(longitude)

    console.log('dataListing', dataListing)
    console.log(parseFloat(dataListing.latitude))

    return (
        <ReactMapGL
            mapboxAccessToken={TokenMAp}
            initialViewState={{
                longitude: longitude,
                latitude: latitude,
                zoom: (matches) ? 14 : 12
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/light-v10"
            onViewportChange={(value) => console.log('onViewportChange', value)}
        >
            <Marker
                latitude={latitude}
                longitude={longitude}
                offsetLeft={-20}
                offsetTop={-10}
            >
                <img
                    // ref={setReferenceElement}
                    src={pinMap}
                    alt="pinMap"
                    className={styles.imagePinMAp}
                />
            </Marker>
        </ReactMapGL>
    )
}

export default MapComp


// https://mantine.dev/core/popper/


//// Default public token
/// pk.eyJ1IjoibWlndWVsLWNoYW5nIiwiYSI6ImNsNGg4dWYwYzBmbngzY3J5bHVweHU1MDMifQ.8G5d5W8A_klOsSzuHfdHAA

/// Interinvestments_TFM
/// sk.eyJ1IjoibWlndWVsLWNoYW5nIiwiYSI6ImNsNGg4ejBzdTAzNm0zaW1wbWxqNDJ0MGoifQ.Tab8xObr4uRoes_d3-D6lw