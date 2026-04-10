import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
//mantine
import { Box, Text, Avatar } from "@mantine/core";
// redux
import { useSelector } from "react-redux";
// assets
import imagePin from "./asset/Pin.svg";
// store
import { useDispatch } from "react-redux";
import { actionslices } from "../../components/store";
// styles
import style from "./styles.ML.module.scss";

const MarkerMap = (props) => {
  const {
    latitude,
    longitude,
    title,
    subTitle,
    price,
    urlImagen,
    uri,
    idListing,
  } = props;

  const [opacityMarker, setOpacityMarker] = useState(0.6);
  const { selectedListing } = useSelector((state) => state.listing_data);

  const dispatch = useDispatch();
  const { setSelectedListing } = actionslices;

  const handleMarkerClick = () => {
    dispatch(
      setSelectedListing({
        id: idListing,
        lat: latitude,
        lng: longitude,
      })
    );
    setOpacityMarker(1);
  };

  const handleMarkerMouseOver = (marker) => {
    setOpacityMarker(1);

    dispatch(
      setSelectedListing({
        id: idListing,
        lat: latitude,
        lng: longitude,
      })
    );
  };

  const handleMarkerMouseOut = () => {
    setOpacityMarker(0.6);
  };

  const handleCloseInfoWindow = () => {
    setOpacityMarker(0.6);
    dispatch(setSelectedListing(null));
  };

  const goToListing = () => {
    window.location.href = uri;
  };

  if (latitude && longitude && props?.idListing) {
    return (
      <Marker
        opacity={props.idListing === selectedListing?.id ? 1 : opacityMarker}
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
        {props.idListing === selectedListing?.id ? (
          <InfoWindow
            onCloseClick={() => handleCloseInfoWindow()}
            position={{
              lat: parseFloat(latitude),
              lng: parseFloat(longitude),
            }}
            
          >
            <Box onClick={() => goToListing()} className="hover:cursor-pointer flex flex-col gap-5 lg:flex-row w-full max-w-[317px]">
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
        ) : null}
      </Marker>
    );
  } else return null;
};

export default MarkerMap;
