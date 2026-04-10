import React, { useEffect, useRef } from "react";
//mantine
import { Box, LoadingOverlay } from "@mantine/core";
// components
import Marker from "./Marker";
import ErrorMaps from "./ErrorMaps";
//  map
import stylesmaps from "./stylesmaps";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
// redux
import { useSelector } from "react-redux";
// stils
import { numFormatter } from "../../utils";

// styles
import style from "./styles.ML.module.scss";

const DEFAULT_CENTER = { 
  lat: 25.761681,
    lng: -80.191788,
}

const MapListing = (props) => {

  const { mapApiKey, dataListing } = useSelector((state) => state.statusQuery);
  const { selectedListing } = useSelector((state) => state.listing_data);
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: mapApiKey,
  });

  const mapRef = useRef();

  useEffect(() => {
    if (dataListing.length) {
      const finalCordenadas = dataListing.find(
        (listing) =>
          listing.listingData.newDevelopment?.latitude &&
          listing.listingData.newDevelopment?.longitude
      );

      const { latitude, longitude } =
        finalCordenadas.listingData.newDevelopment;

      if (latitude && longitude && mapRef?.current) {
        mapRef.current.panTo({
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        });
      } else if (mapRef?.current) {
        mapRef?.current.panTo(DEFAULT_CENTER);
      } 
    }
  }, [dataListing]);

  useEffect(() => {
    if (mapRef?.current && selectedListing) {
      mapRef.current.panTo({
        lat: parseFloat(selectedListing?.lat),
        lng: parseFloat(selectedListing?.lng),
      });
    }
  }, [selectedListing]);

  if (loadError) {
    return (
      <Box className={style.mapContainer}>
        <ErrorMaps />
      </Box>
    );
  }

  /* const renderCenterMap = () => {
    if (selectedListing) {
      return {
        lat: parseFloat(selectedListing.lat),
        lng: parseFloat(selectedListing.lng),
      };
    }
    return defaultPropsMap;
  }; */

  return (
    <Box className={style.mapContainer}>
      <LoadingOverlay
        id="LoadingOverlayMap"
        loaderProps={{ size: "sm", color: "#FFB839", variant: "bars" }}
        visible={isLoaded && props.isLoading}
        className={style.overlayMapListing}
        zIndex={100}
        overlayOpacity={0.2}
        overlayColor="#f5f6fa"
        transitionDuration={500}
        overlayBlur={0.5}
      />

      {isLoaded ? (
        <GoogleMap
          onLoad={(map) => {
            mapRef.current = map;
            if (dataListing.length) {
              const finalCordenadas = dataListing.find(
                (listing) =>
                  listing.listingData.newDevelopment?.latitude &&
                  listing.listingData.newDevelopment?.longitude
              );
        
              const { latitude, longitude } =
                finalCordenadas.listingData.newDevelopment;
        
              if (latitude && longitude && mapRef?.current) {
                mapRef.current.panTo({
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                });
              } else if (mapRef?.current) {
                mapRef?.current.panTo(DEFAULT_CENTER);
              } 
            }
          }}
          options={{
            styles: stylesmaps,
            streetViewControl: false,
          }}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          zoom={12}
          //center={renderCenterMap()}
        >
          {dataListing.map((value, index) => {
            const {
              latitude,
              longitude,
              priceMin = 0,
              priceMax = 0,
              photos,
            } = value.listingData.newDevelopment;

            const priceMinFormater = numFormatter(priceMin);
            const priceMaxFormater = numFormatter(priceMax);
            const priceRange = `$${priceMinFormater.number}${priceMinFormater.tag} - $${priceMaxFormater.number}${priceMaxFormater.tag}`;

            return (
              <Marker
                idListing={value.databaseId}
                uri={value.uri}
                title={value.title}
                subTitle={value.neighborhoods.nodes[0]?.name}
                price={priceRange}
                key={index}
                latitude={latitude}
                longitude={longitude}
                urlImagen={photos[0]?.sourceUrl}
              />
            );
          })}
        </GoogleMap>
      ) : (
        <LoadingOverlay
          visible
          id="LoadingMountMaps"
          loaderProps={{ size: "sm", color: "#FFB839", variant: "bars" }}
          className={style.overlayMapListing}
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

export default React.memo(MapListing);
