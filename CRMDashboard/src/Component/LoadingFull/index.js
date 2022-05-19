import { useEffect } from "react";
import { Box, Overlay, createStyles } from "@mantine/core";
import lottie from "lottie-web";
import IntroLoading from "../../Lottie/IntroLoading.json";

// redux
import { useSelector } from "react-redux";

const useStyles = createStyles((theme, _params, getRef) => ({
  box: {
    position: "absolute",
    height: "100vh",
    width: "100%",
    backgroundColor: "transparent",
    zIndex: 9999,
    display: _params.isLoading ? "block" : "none",
  },
  lottieContainer: {
    position: "fixed",
    backgroundColor: "transparent",
    width: "300px",
    height: "300px",
    zIndex: 9999,
    top: "50%",
    left: "50%",
    marginTop: "-150px",
    marginLeft: "-150px",
    display: _params.isLoading ? "block" : "none",
  },
}));

const LoadingFull = ({ isLoadingLazy, idLazy }) => {
  const { isLoadingFull } = useSelector((state) => state.user);
  const { classes } = useStyles({ isLoading: isLoadingFull || isLoadingLazy });
  const id = "wp-loading-full".concat(idLazy || "");
  useEffect(() => {
    if (id && (isLoadingFull || isLoadingLazy)) {
      lottie.loadAnimation({
        container: document.querySelector(`#${id}`),
        animationData: IntroLoading,
        renderer: "svg",
        loop: true,
        width: "200px",
        height: "200px",
        autoplay: true,
        name: id,
      });
    } else if (id) {
      lottie.destroy(id);
    }
  }, [isLoadingFull, isLoadingLazy, id]);
  return (
    <Box className={classes.box}>
      <Overlay zIndex={9998} color="#000" opacity={0.3} />
      <Box id={id} className={classes.lottieContainer} />
    </Box>
  );
};

export default LoadingFull;
