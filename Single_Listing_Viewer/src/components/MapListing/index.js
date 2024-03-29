import React from "react";
// components
import MapComp from "./MapComp";
//mantine
import { Box, Text } from "@mantine/core";
// css
import styles from "./styles.ml.module.scss";

const MapListing = (props) => {
  const { data, optionTheme } = props;

  if (data.latitude !== null || data.longitude !== null) {
    return (
      <>
        <Box className={styles.containerMap}>
          {data.neighborhoods.length ? (
            <Box className={styles.BoxContainer}>
              <Text
                className={styles.titleMap}
                component="h4"
                data-aos-once="true"
                data-aos="fade-down"
              >
                Neighborhood
              </Text>
              <Text
                className={styles.NameNeighborhood}
                component="h2"
                data-aos-once="true"
                data-aos="fade-down"
                data-aos-delay="1200"
              >
                {data.neighborhoods[0].name}
              </Text>
            </Box>
          ) : null}
        </Box>
        {data.latitude !== null || data.longitude !== null ? (
          <Box
            data-aos-once="true"
            data-aos="zoom-in"
            data-aos-delay="1200"
            className={styles.containerMapCanvas}
          >
            <MapComp dataListing={{ ...data }} optionTheme={optionTheme} />
          </Box>
        ) : null}
      </>
    );
  } else {
    return <div />;
  }
};

export default MapListing;
