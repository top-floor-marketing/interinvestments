import React, { useState } from "react";
// mantine
import {
  Box,
  TextInput,
  Button,
  Alert,
  UnstyledButton,
  Text,
} from "@mantine/core";
import { At, User, AlertCircle } from "tabler-icons-react";
import { useForm, joiResolver } from "@mantine/form";
import { useMantineTheme } from "@mantine/core";
import schema from "./schema";
//styles
import useStyles from "../stylesLogin";
// react-query
import { LOGIN_WITH_JWT } from "../../../../GraphqlClient/user.gql";
import { useMutationHelper } from "../../../../GraphqlClient/useRequest";

const FormLogin = (props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [watchAlert, setwatchAlert] = useState(false);
  const { onSuccessLogin } = props;

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      password: "",
      username: "",
    },
  });

  const { isLoading, mutate: mutateLogin } = useMutationHelper({
    name: "login-with-jwt",
    gql: LOGIN_WITH_JWT,
    config: {
      onError: () => {
        setwatchAlert(true);
      },
      onSuccess: (response) => {
        if (response && onSuccessLogin) {
          form.setFieldValue("password", "");
          form.setFieldValue("username", "");
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
    <Box className={classes.containerForm}>
      {watchAlert && (
        <Alert icon={<AlertCircle size={20} />} color="error">
          <Text style={{ color: theme.colors.dark[0] }}>
            Network error, please try again later
          </Text>
        </Alert>
      )}
      <form onSubmit={form.onSubmit((values) => onSubmitForm(values))}>
        <Box className={classes.formLogin}>
          <TextInput
            disabled={isLoading}
            className={classes.InputForm}
            icon={<At />}
            placeholder="User name"
            radius="sm"
            {...form.getInputProps("username")}
          />
          <TextInput
            disabled={isLoading}
            type="password"
            className={classes.InputForm}
            icon={<User />}
            placeholder="Password"
            radius="sm"
            {...form.getInputProps("password")}
          />
          <Button
            type="submit"
            radius="sm"
            size="xl"
            compact
            color="secondary"
            loading={isLoading}
            className={classes.buttonLogin}
          >
            Login
          </Button>
        </Box>
      </form>
      <UnstyledButton
        component="a"
        href="/wp-login.php?action=lostpassword"
        className={classes.buttonForgot}
        variant="subtle"
        
      >
        Forgot your password?
      </UnstyledButton>
    </Box>
  );
};

export default FormLogin;
