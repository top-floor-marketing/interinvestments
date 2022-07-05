import React from 'react'
// components
import InputForm from './InputForm'
import ButtonForm from './ButtonForm'
import AlertErrorForm from './AlertErrorForm'
import { Text, Paper, Box } from '@mantine/core';
import { useForm, joiResolver } from '@mantine/form';
// schema joi
import FormSchema from './Formschema'
// styles
import styles from './styles.cf.module.scss'

const PaperForm = () => {

    const form = useForm({
        schema: joiResolver(FormSchema),
        initialValues: {
            fullName: '',
            email: '',
            messageContact: '',
        },
    });

    return (
        <Paper className={styles.PaperForm}>
            <Text component='h4' className={styles.titlePaper}>Let’s get in touch:</Text>
            <Text component='p' className={styles.descriptionForm}>
                Using the form below, please provide as much detailed information as possible.
            </Text>
            <AlertErrorForm errorForm={form.errors} />
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Box className={styles.containerBoxInput}>
                    <InputForm
                        propsForm={{ ...form.getInputProps("fullName") }}
                        placeholder='Full Name'
                    />
                    <InputForm
                        placeholder='Email'
                        propsForm={{ ...form.getInputProps("email") }}
                    />
                    <InputForm
                        placeholder='What are you interested in?'
                        propsForm={{ ...form.getInputProps("messageContact") }}
                    />
                    <Box className={styles.containerbutton}>
                        <ButtonForm />
                    </Box>
                </Box>
            </form>
        </Paper>
    )
}

export default PaperForm