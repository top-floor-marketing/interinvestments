import React, { useState } from "react";
// mantine
import { Box, TextInput, Button, Alert } from "@mantine/core";
import { At, User, AlertCircle } from "tabler-icons-react";
import { useForm, joiResolver } from "@mantine/form";
import schema from "./schema";
//styles
import useStyles from "../stylesLogin";
// react-query
import { INTER_INVESTMENTS_ADMIN_LOGIN } from "../../../../GraphqlClient/GQL";
import { useMutationHelper } from "../../../../GraphqlClient/useRequest";

const FormLogin = (props) => {
    const { classes } = useStyles();
    const [watchAlert, setwatchAlert] = useState(false)
    const { onSuccessLogin } = props;

    const form = useForm({
        schema: joiResolver(schema),
        initialValues: {
            password: "",
            username: "",
        },
    });

    const { isLoading, mutate: mutateLogin, } = useMutationHelper({
        name: "INTER_INVESTMENTS_LOGIN",
        gql: INTER_INVESTMENTS_ADMIN_LOGIN,
        config: {
            onError: () => {
                setwatchAlert(true)
            },
            onSuccess: (response) => {
                if (response && onSuccessLogin) {
                    form.setFieldValue('password', "")
                    form.setFieldValue('username', "")
                    onSuccessLogin(response)
                }
            }
        }
    });

    const onSubmitForm = (valueForm) => {
        setwatchAlert(false)
        const { username, password } = valueForm;
        mutateLogin({
            variables: { input: { username: username, password } },
        });
    };


    return (
        <Box className={classes.containerForm}>
            {
                (watchAlert) && (
                    <Alert style={{ marginBottom: '10px' }} icon={<AlertCircle size={16} />} color="red" radius="lg">
                        network error, please try again later
                    </Alert>
                )
            }
            <form onSubmit={form.onSubmit((values) => onSubmitForm(values))}>
                <TextInput
                    disabled={isLoading}
                    style={{ margin: 0 }}
                    className={classes.InputForm}
                    icon={<At />}
                    placeholder="Your user name"
                    radius="md"
                    {...form.getInputProps("username")}
                />
                <TextInput
                    disabled={isLoading}
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
                    loading={isLoading}
                    className={classes.buttonLogin}
                >
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default FormLogin;
