import React, { useState } from 'react'
// components
import InputForm from './InputForm'
import ButtonForm from './ButtonForm'
import AlertErrorForm from './AlertErrorForm'
// mantine
import { Text, Paper, Box } from '@mantine/core';
import { useForm, joiResolver } from '@mantine/form';
// schema joi
import FormSchema from './Formschema'
// styles
import styles from './styles.cf.module.scss'
// react-query
import { useMutationHelper } from '../../GraphqlClient/useRequest';
import { LEAD_LISTING_MUTATION } from '../../GraphqlClient/GQL';

const PaperForm = (props) => {
    const { isLoading, isDisabled, setIsErroForm, listingData } = props
    const [onSuccessAlert, setOnSuccessAlert] = useState(false)

    const form = useForm({
        schema: joiResolver(FormSchema),
        initialValues: {
            fullName: '',
            email: '',
            messageContact: '',
        },
    });

    const { isLoading: isLoadingMutation, mutate: mutate_Lead_Listing } = useMutationHelper({
        name: "login-with-jwt",
        gql: LEAD_LISTING_MUTATION,
        config: {
            onError: () => {
                setIsErroForm(true);
            },
            onSuccess: () => {
                setOnSuccessAlert(true)
            },
        },
    });

    const onSubmitForm = (valuesForm) => {
        mutate_Lead_Listing({
            variables: {
                input: {
                    "name": valuesForm.fullName,
                    "email": valuesForm.email,
                    "interested": valuesForm.messageContact,
                    "listingId": listingData.databaseId.toString(),
                }
            },
        });
    }

    return (
        <Paper
            data-aos="zoom-in"
            data-aos-duration="700"
            className={styles.PaperForm}
        >
            {
                (onSuccessAlert) ? (
                    <>
                        <Text component='h4' className={styles.titlePaper}>Let’s get in touch:</Text>
                        <Box className='flex justify-center w-full h-full mt-12'>
                            <Text component='p' className={styles.descriptionForm}>
                                Thank you for submitting a request for information, one of our agents will be in contact with you shortly
                            </Text>
                        </Box>
                    </>
                ) : (
                    <>
                        <Text component='h4' className={styles.titlePaper}>Let’s get in touch:</Text>
                        <Text component='p' className={styles.descriptionForm}>
                            Using the form below, please provide as much detailed information as possible.
                        </Text>
                        <AlertErrorForm errorForm={form.errors} />
                        <form onSubmit={form.onSubmit((values) => onSubmitForm(values))}>
                            <Box className={styles.containerBoxInput}>
                                <InputForm
                                    isLoading={isLoading || isLoadingMutation}
                                    isDisabled={isLoading || isDisabled || isLoadingMutation}
                                    propsForm={{ ...form.getInputProps("fullName") }}
                                    placeholder='Full Name'
                                />
                                <InputForm
                                    isLoading={isLoading || isLoadingMutation}
                                    isDisabled={isLoading || isDisabled || isLoadingMutation}
                                    placeholder='Email'
                                    propsForm={{ ...form.getInputProps("email") }}
                                />
                                <InputForm
                                    isLoading={isLoading || isLoadingMutation}
                                    isDisabled={isLoading || isDisabled || isLoadingMutation}
                                    placeholder='What are you interested in?'
                                    propsForm={{ ...form.getInputProps("messageContact") }}
                                />
                                <Box className={styles.containerbutton}>
                                    <ButtonForm
                                        isLoading={isLoadingMutation}
                                        isDisabled={isLoading || isDisabled || isLoadingMutation}
                                    />
                                </Box>
                            </Box>
                        </form>
                    </>
                )
            }

        </Paper >
    )
}

export default PaperForm