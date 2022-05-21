import React, { useEffect, useState } from 'react'
// mantine
import { Box, TextInput, Button } from '@mantine/core';
import { At, User } from 'tabler-icons-react';
import { useForm, joiResolver } from '@mantine/form';
import schema from './schema'
//styles
import useStyles from '../stylesLogin'
// react-query
import { INTER_INVESTMENTS_ADMIN_LOGIN } from '../../../../GraphqlClient/GQL'
import { useMutationHelper } from '../../../../GraphqlClient/useRequest';

const FormLogin = (props) => {
    const [dataForm, setDataForm] = useState({
        password: "t6SYG0^2tCvt#(J9NS",
        username: "InterInvestmentsAdmin"
    })

    // "password": "t6SYG0^2tCvt#(J9NS",
    // "username": "InterInvestmentsAdmin"
    const { classes } = useStyles();
    const { onSuccessLogin } = props

    const form = useForm({
        schema: joiResolver(schema),
        initialValues: {
            password: '',
            email: '',
        },
    });

    const { isLoading, isError, data, mutate: mutateLogin, isFetching } = useMutationHelper({
        name: 'INTER_INVESTMENTS_ADMIN_LOGIN',
        gql: INTER_INVESTMENTS_ADMIN_LOGIN,
        // variables: { "input": { ...dataForm } },
        // config: { enabled: false }
    })

    const onSubmitForm = (valueForm) => {
        const { email, password } = valueForm
        console.log(valueForm)
        mutateLogin({ variables: { "input": { ...dataForm } } })
    }

    useEffect(() => {
        if (data) {
            console.log('data', data)
        }
    }, [data])

    return (
        <Box className={classes.containerForm}>
            <form onSubmit={form.onSubmit((values) => onSubmitForm(values))}>
                <TextInput
                    style={{ margin: 0 }}
                    className={classes.InputForm}
                    icon={<At />}
                    placeholder="Your email"
                    radius="md"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    type='password'
                    className={classes.InputForm}
                    icon={<User />}
                    placeholder="Your pass"
                    radius="md"
                    {...form.getInputProps('password')}
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
    )
}

export default FormLogin