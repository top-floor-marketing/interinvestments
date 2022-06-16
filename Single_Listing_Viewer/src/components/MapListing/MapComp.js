import React from 'react'
//mantine
// import { Box, Text } from '@mantine/core'
// map
import ReactMapGL, { Marker } from "react-map-gl";
import pinMap from '../../assets/img/pinMap.svg'
// css
import styles from './styles.ml.module.scss'

const TokenMAp = process.env.REACT_APP_TFM_TOKEN_MAP

const MapComp = () => {
    return (
        <ReactMapGL
            mapboxAccessToken={TokenMAp}
            initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/light-v10"
        >
            <Marker
                latitude={37.799884}
                longitude={-122.400390}
                offsetLeft={-20}
                offsetTop={-10}
            >
                <img src={pinMap} alt="pin" className={styles.imagePinMAp} />
            </Marker>
        </ReactMapGL>
    )
}

export default MapComp



//// Default public token
/// pk.eyJ1IjoibWlndWVsLWNoYW5nIiwiYSI6ImNsNGg4dWYwYzBmbngzY3J5bHVweHU1MDMifQ.8G5d5W8A_klOsSzuHfdHAA

/// Interinvestments_TFM
/// sk.eyJ1IjoibWlndWVsLWNoYW5nIiwiYSI6ImNsNGg4ejBzdTAzNm0zaW1wbWxqNDJ0MGoifQ.Tab8xObr4uRoes_d3-D6lw