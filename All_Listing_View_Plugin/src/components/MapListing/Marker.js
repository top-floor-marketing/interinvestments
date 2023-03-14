import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
//mantine
import { Box, Text, Avatar } from "@mantine/core";
// redux
import { useSelector } from "react-redux";
// assets
import imagePin from "./asset/Pin.svg";
// styles
import style from "./styles.ML.module.scss";

const MarkerMap = (props) => {
  const { latitude, longitude, title, subTitle, price, urlImagen, uri } = props;
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [onOpenMarker, setOnOpenMarker] = useState(false);
  const [opacityMarker, setOpacityMarker] = useState(0.6);
  const { selectedListing } = useSelector((state) => state.listing_data);

  const handleMarkerClick = () => {
    setOpacityMarker(1);
    setOnOpenMarker(!onOpenMarker);
  };

  const handleMarkerMouseOver = (marker) => {
    setSelectedMarker(marker);
    setOpacityMarker(1);
  };

  const handleMarkerMouseOut = () => {
    setSelectedMarker(null);
    setOpacityMarker(0.6);
  };

  if (latitude && longitude && props?.idListing) {
    return (
      <Marker
        opacity={props.idListing === selectedListing ? 1 : opacityMarker}
        onClick={() => handleMarkerClick()}
        onMouseOver={handleMarkerMouseOver}
        onMouseOut={handleMarkerMouseOut}
        position={{
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        }}
        icon={{
          scaledSize: new window.google.maps.Size(28, 35),
          url: imagePin,
        }}
      >
        {(selectedMarker ||
          onOpenMarker ||
          props.idListing === selectedListing) && (
          <InfoWindow
            onCloseClick={() => {
              setOpacityMarker(0.6);
              setSelectedMarker(null);
              setOnOpenMarker(!onOpenMarker);
            }}
          >
            <Box className="flex flex-col gap-5 lg:flex-row w-full max-w-[317px]">
              <Avatar
                className={style.avatarListing}
                radius="xs"
                alt={`ImagenListing_${title}`}
                src={urlImagen}
              />
              <Box className="flex flex-col justify-between">
                {title && (
                  <Text
                    title={title}
                    className={style.titleListingMap}
                    lineClamp={1}
                    component="a"
                    href={uri}
                  >
                    {title}
                  </Text>
                )}
                <Box className={style.containerInfoListing}>
                  {subTitle && (
                    <Text title={subTitle} component="span" lineClamp={1}>
                      {subTitle}
                    </Text>
                  )}
                  {price && (
                    <Text
                      title={`Price ${price}`}
                      component="span"
                      lineClamp={1}
                    >
                      Price: {price}
                    </Text>
                  )}
                </Box>
              </Box>
            </Box>
          </InfoWindow>
        )}
      </Marker>
    );
  } else return null;
};

export default MarkerMap;
