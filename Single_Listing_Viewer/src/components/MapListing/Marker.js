import React from "react";
//mantine
import { Box, Text, Avatar } from "@mantine/core";
// maps
import { Marker, InfoWindow } from "@react-google-maps/api";
// assets
import imagePin from "../../assets/PinMap.svg";
// styles
import style from "./styles.ml.module.scss";
// utils
import { numFormatter } from "../../utils";

const MarkerMap = (props) => {
  const {
    lat,
    lng,
    title,
    subTitle,
    priceMin,
    priceMax,
    urlImagen,
    opened = true,
  } = props;

  const priceMinFormater = numFormatter(priceMin);
  const priceMaxFormater = numFormatter(priceMax);
  const priceRange = `$${priceMinFormater.number}${priceMinFormater.tag} - $${priceMaxFormater.number}${priceMaxFormater.tag}`;

  if (lat && lng) {
    return (
      <Marker
        opacity={opened ? 1 : 0.6}
        position={{
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        }}
        icon={{
          scaledSize: new window.google.maps.Size(28, 35),
          url: imagePin,
        }}
      >
        {opened && (
          <InfoWindow>
            <Box className="flex flex-col gap-5 lg:flex-row min-w-full max-w-[317px]">
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
                    component="span"
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

                  <Text
                    title={`Price ${priceRange}`}
                    component="span"
                    lineClamp={1}
                  >
                    Price: {priceRange}
                  </Text>
                </Box>
              </Box>
            </Box>
          </InfoWindow>
        )}
      </Marker>
    );
  } else {
    return null;
  }
};

export default MarkerMap;
