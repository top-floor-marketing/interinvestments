import React, { useState, useEffect } from "react";
//mantine
import { Box, LoadingOverlay } from "@mantine/core";
// components
import Marker from "./Marker";
// map
import GoogleMapReact from "google-map-react";
import stylesmaps from "./stylesmaps";
// redux
import { useSelector } from "react-redux";
// styles
import style from "./styles.ML.module.scss";

const MapListing = (props) => {
  const [defaultPropsMap, setDefaultProps] = useState({
    lat: 25.761681,
    lng: -80.191788,
  });
  const { isLoading } = props;
  const { mapApiKey, dataListing } = useSelector((state) => state.statusQuery);

  useEffect(() => {
    if (dataListing.length) {
      const finalCordenadas = dataListing.find(
        (listing) =>
          listing.listingData.newDevelopment?.latitude &&
          listing.listingData.newDevelopment?.longitude
      );

      const { latitude, longitude } =
        finalCordenadas.listingData.newDevelopment;

      if (latitude && longitude) {
        setDefaultProps({
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        });
      } else {
        setDefaultProps({
          lat: 25.813919,
          lng: -80.249178,
        });
      }
    }
  }, [dataListing]);

  return (
    <Box className={style.mapContainer}>
      <LoadingOverlay
        id="LoadingOverlayMap"
        loaderProps={{ size: "sm", color: "#FFB839", variant: "bars" }}
        visible={isLoading}
        className={style.overlayMapListing}
        zIndex={100}
        overlayOpacity={0.2}
        overlayColor="#f5f6fa"
        transitionDuration={500}
        overlayBlur={0.5}
      />
      <GoogleMapReact
        options={{
          styles: stylesmaps,
        }}
        bootstrapURLKeys={{ key: mapApiKey }}
        defaultCenter={defaultPropsMap}
        defaultZoom={11}
      >
        {dataListing.map((value, index) => {
          const {
            latitude,
            longitude,
            priceMin = 0,
            priceMax = 0,
            photos,
          } = value.listingData.newDevelopment;
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
          );
        })}
      </GoogleMapReact>
    </Box>
  );
};

export default MapListing;
