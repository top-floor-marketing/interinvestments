import React from "react";
//componets
import FormLogin from "./FormLogin";
import CarouselLogin from "./CarouselLogin";
// mantine
import { Paper, Box, Image, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

// styles
import useStyles from "./stylesLogin";
import logoLogin from "./assets/images/Logo.svg";

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const DOMAIN_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_DOMAIN_PROD
    : process.env.REACT_APP_DOMAIN_DEV;

const Login = (props) => {
  const matches = useMediaQuery("(min-width: 1022px)");
  const { classes } = useStyles();
  const { onSuccessLogin = null } = props;

  const goToHome = () => {
     const uriForLogo = `${DOMAIN_URL}`;
     window.location.replace(uriForLogo);
  }

  return (
      <Paper className={classes.containerLogin}>
        <Box className={classes.contentLogin}>
          <Box className={classes.contentFom}>
            <Image
              title="Go back to homepage"
              className={classes.logo}
              height={matches ? 22 : 18}
              src={logoLogin}
              alt="ImageLogo"
              onClick={() => goToHome()}
            />
            <FormLogin onSuccessLogin={onSuccessLogin} />
            <Group spacing="0" className={classes.groupBackHome}>
              <Text title="Go back to homepage" component="span" color="primary" onClick={() => goToHome()}>Go back to homepage</Text>
            </Group> 
          </Box>
          <CarouselLogin />
        </Box>
      </Paper>
  );
};

export default Login;
