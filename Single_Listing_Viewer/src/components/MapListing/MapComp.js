import React, { useState } from "react";
// componet
<<<<<<< HEAD
import Marker from "./Marker";
=======
// import Marker from "./Marker";
>>>>>>> b2ebe99 (QA David)
//mantine
import { Box } from "@mantine/core";
// map
import GoogleMapReact from "google-map-react";
import stylesmaps from "./stylesmaps";
// css
import styles from "./styles.ml.module.scss";

const MapComp = (props) => {
<<<<<<< HEAD
  const [openedMarker, setOpenedMarker] = useState(false);
=======
  // const [openedMarker, setOpenedMarker] = useState(false);
>>>>>>> b2ebe99 (QA David)
  const { dataListing, optionTheme } = props;
  const { latitude, longitude } = dataListing;

  const defaultProps = {
    center: {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    },
  };

<<<<<<< HEAD
  // console.log("optionTheme", optionTheme);

  return (
    <Box
      className={styles.BoxMap}
      onMouseOver={() => setOpenedMarker(true)}
      onMouseOut={() => setOpenedMarker(false)}
    >
      <GoogleMapReact
        options={{
          styles: stylesmaps,
          scrollwheel: false,
          gestureHandling: "greedy",
          fullscreenControl: false,
          zoomControl: false,
        }}
        bootstrapURLKeys={{ key: optionTheme.mapApiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={15}
      >
        <Marker
          opened={openedMarker}
          uri={dataListing.uri}
          title={dataListing.title}
          subTitle={dataListing.neighborhoods[0]?.name}
          priceMin={dataListing.priceMin}
          priceMax={dataListing.priceMax}
          lat={parseFloat(latitude)}
          lng={parseFloat(longitude)}
          urlImagen={dataListing.photos[0]?.sourceUrl}
        />
      </GoogleMapReact>
    </Box>
  );
};

=======
  return (
    <Box
      className={styles.BoxMap}
      // onMouseOver={() => setOpenedMarker(true)}
      // onMouseOut={() => setOpenedMarker(false)}
    >
      <GoogleMapReact
        options={{
          styles: stylesmaps,
          scrollwheel: false,
          gestureHandling: "greedy",
          fullscreenControl: false,
          zoomControl: false,
        }}
        bootstrapURLKeys={{ key: optionTheme.mapApiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={15}
      >
        {
          // <Marker
          //     opened={openedMarker}
          //     uri={dataListing.uri}
          //     title={dataListing.title}
          //     subTitle={dataListing.neighborhoods[0]?.name}
          //     priceMin={dataListing.priceMin}
          //     priceMax={dataListing.priceMax}
          //     lat={parseFloat(latitude)}
          //     lng={parseFloat(longitude)}
          //     urlImagen={dataListing.photos[0]?.sourceUrl}
          // />
        }
      </GoogleMapReact>
    </Box>
  );
};

>>>>>>> b2ebe99 (QA David)
export default MapComp;
