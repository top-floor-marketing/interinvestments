import { useState } from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Paper,
  Group,
  UnstyledButton,
  Alert,
} from '@mantine/core';
import { Input, TextInput } from '@mantine/core';
import { useForm, joiResolver } from '@mantine/form';
import schema from './schema';
import SpringDiv from '../../../Component/SpringDiv';
import { User, Lock, AlertCircle } from 'tabler-icons-react';
import { useMutationHelper } from '../../../GraphqlClient/useRequest';
import { LOGIN_WITH_JWT } from '../../../GraphqlClient/user.gql';
//import InfoLogin from './infoLogin';
// styles
import useStyles from './stylesLoginForm';
import logoLogin from './assets/images/Logo.svg';

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const DOMAIN_URL =
  ENVIROMENT === 'production'
    ? process.env.REACT_APP_DOMAIN_PROD
    : process.env.REACT_APP_DOMAIN_DEV;

const LoginForm = (props) => {
  const { classes } = useStyles();
  const [watchAlert, setwatchAlert] = useState(false);
  const [disabledForm, setDisabledForm] = useState(false);
  const { onSuccessLogin } = props;
  const goToHome = () => {
    const uriForLogo = `${DOMAIN_URL}`;
    window.location.replace(uriForLogo);
  };
  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      password: '',
      username: '',
    },
  });
  const { isLoading, mutate: mutateLogin } = useMutationHelper({
    name: ['login-with-jwt'],
    gql: LOGIN_WITH_JWT,
    config: {
      onError: () => {
        setwatchAlert(true);
        setDisabledForm(false);
      },
      onSuccess: (response) => {
        setDisabledForm(true);
        if (response && onSuccessLogin) {
          form.setFieldValue('password', '');
          form.setFieldValue('username', '');
          onSuccessLogin(response);
        }
      },
    },
  });
  const onSubmitForm = (valueForm) => {
    setwatchAlert(false);
    const { username, password } = valueForm;
    mutateLogin({
      variables: { input: { username: username, password } },
    });
  };
  return (
    <Box className={classes.containerLogin}>
      <SpringDiv
        delay={100}
        duration={700}
        className={classes.loginFormContainer}
      >
        <Paper className={classes.formCard}>
          <Image
            title='Go back to homepage'
            className={classes.logo}
            src={logoLogin}
            alt='ImageLogo'
            onClick={() => goToHome()}
          />
          <Text component='h3'>Log in</Text>
          {watchAlert && (
            <Alert className={classes.alertLogin} icon={<AlertCircle size={20} />} variant="filled" color="error">
              <Text>Login failed. Please check your credentials and try again.</Text>
            </Alert>
          )}
          <form
            className={classes.formTag}
            onSubmit={form.onSubmit((values) => onSubmitForm(values))}
          >
            <Input.Wrapper id='username' label='User'>
              <TextInput
                id='username'
                placeholder='User'
                type='text'
                icon={<User />}
                {...form.getInputProps('username')}
                radius='sm'
                disabled={isLoading || disabledForm}
              />
            </Input.Wrapper>
            <Input.Wrapper id='password' label='Password'>
              <TextInput
                id='password'
                placeholder='Password'
                type='password'
                icon={<Lock />}
                {...form.getInputProps('password')}
                radius='sm'
                disabled={isLoading || disabledForm}
              />
            </Input.Wrapper>
            <Button
              type='submit'
              radius='sm'
              size='xl'
              compact
              color='secondary'
              className={classes.buttonLogin}
              disabled={isLoading || disabledForm}
              loading={isLoading || disabledForm}
            >
              Login
            </Button>
          </form>
          <UnstyledButton
            component='a'
            href='/wp-login.php?action=lostpassword'
            className={classes.buttonForgot}
            variant='subtle'
          >
            Forgot your password?
          </UnstyledButton>
          <Group spacing='0' className={classes.groupBackHome}>
            <Text
              title='Go back to homepage'
              component='span'
              color='primary'
              onClick={() => goToHome()}
            >
              Go back to homepage
            </Text>
          </Group>
        </Paper>
      </SpringDiv>
      <SpringDiv
        delay={400}
        duration={800}
        className={classes.loginBackground}
      />
    </Box>
  );
};

export default LoginForm;
