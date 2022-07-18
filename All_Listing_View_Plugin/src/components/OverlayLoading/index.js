import { useEffect } from "react";
import { Overlay, Center } from "@mantine/core";
import lottie from "lottie-web";
import introJson from "../../Lottie/Intro.json";

import styles from "./styles_gd.module.scss";

const OverlayLoading = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#wp-grid-overlay-inter"),
      animationData: introJson,
    });
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    return () => {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    };
  }, []);
  return (
    <div className={styles.container}>
      <Overlay opacity={0.6} color="#000" zIndex={999} />
      <Center className={styles.center} id="wp-grid-overlay-inter" />
    </div>
  );
};

export default OverlayLoading;
