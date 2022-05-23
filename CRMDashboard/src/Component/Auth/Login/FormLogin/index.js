import React, { useEffect, useState } from "react";
// mantine
import { Box, TextInput, Button } from "@mantine/core";
import { At, User } from "tabler-icons-react";
import { useForm, joiResolver } from "@mantine/form";
import schema from "./schema";
//styles
import useStyles from "../stylesLogin";
// react-query
import { INTER_INVESTMENTS_ADMIN_LOGIN } from "../../../../GraphqlClient/GQL";
import { useMutationHelper } from "../../../../GraphqlClient/useRequest";

const FormLogin = (props) => {
  const { classes } = useStyles();
  const { onSuccessLogin } = props;

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      password: "",
      email: "",
    },
  });

  const {
    isLoading,
    isError,
    data,
    mutate: mutateLogin,
    isFetching,
  } = useMutationHelper({
    name: "INTER_INVESTMENTS_LOGIN",
    gql: INTER_INVESTMENTS_ADMIN_LOGIN,
  });

  const onSubmitForm = (valueForm) => {
    const { email, password } = valueForm;
    mutateLogin({
      variables: { input: { username: email, password } },
    });
  };

  useEffect(() => {
    if (data && onSuccessLogin) {
      alert("DATA SUCCESS");
      console.log("data", data);
    }
  }, [data, onSuccessLogin]);

  return (
    <Box className={classes.containerForm}>
      <form onSubmit={form.onSubmit((values) => onSubmitForm(values))}>
        <TextInput
          style={{ margin: 0 }}
          className={classes.InputForm}
          icon={<At />}
          placeholder="Your email"
          radius="md"
          {...form.getInputProps("email")}
        />
        <TextInput
          type="password"
          className={classes.InputForm}
          icon={<User />}
          placeholder="Your pass"
          radius="md"
          {...form.getInputProps("password")}
        />
        <Button
          type="submit"
          radius="lg"
          size="xl"
          compact
          className={classes.buttonLogin}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default FormLogin;
