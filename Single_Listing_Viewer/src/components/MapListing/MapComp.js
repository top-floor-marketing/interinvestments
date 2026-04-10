import React, { useState } from "react";
// componet
import AlertError from "../AlertError";
import Marker from "./Marker";
//mantine
import { Box, LoadingOverlay } from "@mantine/core";
// map
// import GoogleMapReact from "google-map-react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import stylesmaps from "./stylesmaps";
// css
import styles from "./styles.ml.module.scss";

const MapComp = (props) => {
  const [openedMarker, setOpenedMarker] = useState(false);
  const { dataListing, optionTheme } = props;
  const { latitude, longitude } = dataListing;

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: optionTheme.mapApiKey,
  });

  const defaultProps = {
    center: {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    },
  };

  if (loadError) {
    return (
      <Box className={styles.BoxMap}>
        <Box className="h-full w-full flex justify-center items-center">
          <AlertError
            label="Error Map!"
            description="Please wait a few minutes before you try again"
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      className={styles.BoxMap}
      onMouseOver={() => setOpenedMarker(true)}
      onMouseOut={() => setOpenedMarker(false)}
    >
      {isLoaded ? (
        <GoogleMap
          options={{
            styles: stylesmaps,
            streetViewControl: false,
            gestureHandling: "greedy",
            fullscreenControl: false,
          }}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          zoom={15}
          center={defaultProps.center}
        >
          <Marker
            opened={openedMarker}
            title={dataListing.title}
            subTitle={dataListing.neighborhoods[0]?.name}
            priceMin={dataListing.priceMin}
            priceMax={dataListing.priceMax}
            lat={parseFloat(latitude)}
            lng={parseFloat(longitude)}
            urlImagen={dataListing.photos[0]?.sourceUrl}
          />
        </GoogleMap>
      ) : (
        <LoadingOverlay
          visible
          id="LoadingMountMaps"
          loaderProps={{ size: "sm", color: "#FFB839", variant: "bars" }}
          zIndex={100}
          overlayOpacity={0.2}
          overlayColor="#f5f6fa"
          transitionDuration={500}
          overlayBlur={0.5}
        />
      )}
    </Box>
  );
};

export default MapComp;
