import React from "react";
//componets
import FormLogin from "./FormLogin";
import CarouselLogin from './CarouselLogin'
// mantine
import { Card, Text, Button, Box, Image } from "@mantine/core";
// styles
import useStyles from "./stylesLogin";
import logoLogin from "./assets/images/Logo.svg";

const Login = (props) => {
  const { classes } = useStyles();
  const { onSuccessLogin = null } = props
  return (
    <Box className={classes.containerLogin}>
      <Card style={{ padding: 0 }} shadow="sm" p="lg">
        <Box className={classes.contentLogin}>
          <Box className={classes.contentFom}>
            <Card.Section>
              <Image src={logoLogin} height={22} alt="ImageLogo" />
            </Card.Section>
            <Text
              component="h3"
              className={classes.titleForm}
              align="content-center"
              weight={500}
            >
              Sign in Admin CRM
            </Text>
            <FormLogin onSuccessLogin={onSuccessLogin} />
            <Button
              component='a'
              href="/wp-login.php?action=lostpassword"
              className={classes.buttonPassword}
              variant="subtle"
            >
              "Forgot your password?
            </Button>
          </Box>
          <CarouselLogin />
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
