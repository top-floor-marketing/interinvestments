import { useEffect } from "react";
import { Overlay, Center, Box } from "@mantine/core";
import lottie from "lottie-web";
import introJson from "../../Lottie/Intro.json";

import styles from "./styles_gd_ALV.module.scss";

const ID_OVERLAY_GRID = "id-overlay-grid";

const OverlayLoading = () => {
  useEffect(() => {
    lottie.destroy(ID_OVERLAY_GRID);
    lottie.loadAnimation({
      container: document.querySelector(`#${ID_OVERLAY_GRID}`),
      animationData: introJson,
      autoplay: true,
      name: ID_OVERLAY_GRID,
    });
    return () => {
      lottie.destroy(ID_OVERLAY_GRID);
    };
  }, []);
  return (
    <Box className={styles.container}>
      <Overlay opacity={0.6} color="#000" zIndex={999} />
      <Center className={styles.center} id={ID_OVERLAY_GRID} />
    </Box>
  );
};

export default OverlayLoading;
