import React from "react";
//componets
import FormLogin from "./FormLogin";
import CarouselLogin from "./CarouselLogin";
// mantine
import { Card, Box, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

// styles
import useStyles from "./stylesLogin";
import logoLogin from "./assets/images/Logo.svg";

const Login = (props) => {
  const matches = useMediaQuery("(min-width: 1022px)");
  const { classes } = useStyles();
  const { onSuccessLogin = null } = props;
  return (
    <Box className={classes.containerLogin}>
      <Card style={{ padding: 0 }} shadow="md">
        <Box className={classes.contentLogin}>
          <Box className={classes.contentFom}>
            <Image
              className={classes.logo}
              height={matches ? 28 : 20}
              src={logoLogin}
              alt="ImageLogo"
            />
            <FormLogin onSuccessLogin={onSuccessLogin} />
          </Box>
          <CarouselLogin />
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
