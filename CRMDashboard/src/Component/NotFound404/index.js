import { useEffect } from "react";
import { Login } from 'tabler-icons-react';
import { Box, createStyles, Button } from "@mantine/core";
import { useId } from '@mantine/hooks';
import lottie from "lottie-web";
import ErrorLottie from "../../Lottie/Error-animation-404.json";

import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";
import { ROUTES_NAMES } from "../../Route/routes";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4
  },
  lottieContainer: {
    backgroundColor: "transparent",
    width: "300px",
    height: "300px",
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  button: {
    width: '150px !important',
    marginLeft: "auto !important",
    marginRight: "auto !important",
  }
}));

const NotFound404 = () => {

  const { actions: { setRoute } } = useClientGlobalStore();

  const { classes } = useStyles();
  const uuid = useId();

  useEffect(() => {
    if (uuid) {
      lottie.loadAnimation({
        container: document.querySelector(`#${uuid}`),
        animationData: ErrorLottie,
        renderer: "svg",
        loop: true,
        width: "200px",
        height: "200px",
        autoplay: true,
        name: uuid,
      });
    } else if (uuid) {
      lottie.destroy(uuid);
    }
    return () => {
      lottie.destroy(uuid);
    };
  }, [uuid]);

  const goToLogin = () => {
    setRoute(ROUTES_NAMES.AUTH);
  }

  return (
    <Box className={classes.container}>
      <Box id={uuid} className={classes.lottieContainer} />
      <Button onClick={() => goToLogin()} className={classes.button} leftIcon={<Login />} color='primary' >Go to login</Button>
    </Box>
  );
};

export default NotFound404;
