import React from 'react'
// mantine
import { Box, TextInput, Button } from '@mantine/core';
import { At, User } from 'tabler-icons-react';
import { useForm, joiResolver } from '@mantine/form';
import schema from './schema'
//styles
import useStyles from '../stylesLogin'

const FormLogin = () => {
    const { classes } = useStyles();
    const form = useForm({
        schema: joiResolver(schema),
        initialValues: {
            password: '',
            email: '',
        },
    });
    
    return (
        <Box className={classes.containerForm}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
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