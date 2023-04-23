import { Box, Image } from '@mantine/core';

import SpringDiv from '../../../Component/SpringDiv';

// styles
import useStyles from './stylesLoginForm';
import logoLogin from './assets/images/Logo.svg';

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const DOMAIN_URL =
  ENVIROMENT === 'production'
    ? process.env.REACT_APP_DOMAIN_PROD
    : process.env.REACT_APP_DOMAIN_DEV;

const LoginForm = () => {
  const { classes } = useStyles();
  const goToHome = () => {
    const uriForLogo = `${DOMAIN_URL}`;
    window.location.replace(uriForLogo);
  };
  return (
    <Box className={classes.containerLogin}>
      <SpringDiv
        delay={100}
        duration={700}
        className={classes.loginFormContainer}
      >
        <>
          <Image
            title='Go back to homepage'
            className={classes.logo}
            src={logoLogin}
            alt='ImageLogo'
            onClick={() => goToHome()}
          />
        </>
      </SpringDiv>
      <SpringDiv
        delay={400}
        duration={800}
        className={classes.loginBackground}
      ></SpringDiv>
    </Box>
  );
};

export default LoginForm;
