import React, { useState } from "react";
//componets
import FormLogin from "./FormLogin";
import Forgotpassword from "./Forgotpassword";
// mantine
import { Card, Text, Button, Box, Image } from "@mantine/core";
// styles
import useStyles from "./stylesLogin";
import logoLogin from "./assets/images/Logo.svg";

const Login = () => {
  const { classes } = useStyles();
  const [activeViewLogin, setActiveViewLogin] = useState(true);
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
              {activeViewLogin ? "Sign in" : "Forgot password"}
            </Text>
            {activeViewLogin ? <FormLogin /> : <Forgotpassword />}
            <Button
              onClick={() => setActiveViewLogin(!activeViewLogin)}
              className={classes.buttonPassword}
              variant="subtle"
            >
              {!activeViewLogin ? "back to Sign in" : "Forgot your password?"}
            </Button>
          </Box>
          <Box className={classes.imageLogin}>
            <Box className={classes.ParallaxCroma} />
            <Box className={classes.ParallaxContain} />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
