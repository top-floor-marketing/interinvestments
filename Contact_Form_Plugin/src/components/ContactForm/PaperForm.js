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
import styles from './styles_CF.module.scss'
// react-query
import { useMutationHelper } from '../../GraphqlClient/useRequest';
import { LEAD_LISTING_MUTATION } from '../../GraphqlClient/GQL';

// const URL_SHARED_FLAG = 'shared';
const URL_QUERY_ID_NAME = 'agent-id';

const PaperForm = (props) => {
    const { isLoading, isDisabled, setIsErroForm, listingData } = props
    const [onSuccessAlert, setOnSuccessAlert] = useState(false)

    const queryParams = new URLSearchParams(window.location.search);

    // const isShared = (queryParams.get(URL_SHARED_FLAG)?.toLowerCase() === 'true');
    const idInUrl = parseInt(queryParams.get(URL_QUERY_ID_NAME));

    const form = useForm({
        validate: joiResolver(FormSchema),
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            messageContact: '',
        },
    });

    const { isLoading: isLoadingMutation, mutate: mutate_Lead_Listing } = useMutationHelper({
        name: "lead-listing-mutation",
        gql: LEAD_LISTING_MUTATION,
        config: {
            onError: () => {
                setIsErroForm(true);
            },
            onSuccess: () => {
                form.reset();
                setOnSuccessAlert(true);
                setTimeout(() => {
                    setOnSuccessAlert(false);
                }, [10000]);
            },
        },
    });

    const onSubmitForm = (valuesForm) => {
        mutate_Lead_Listing({
            variables: {
                input: {
                    firstName: valuesForm.fullName,
                    email: valuesForm.email,
                    phone: valuesForm.phone,
                    interested: valuesForm.messageContact,
                    listingId: listingData ? [parseInt(listingData?.databaseId)] : [],
                    agentId: idInUrl ? `${idInUrl}` : null,
                    idStatusUserLead: listingData ? null : props?.idAskLeadStatus
                },
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
                        <Text component='h3' className={styles.titlePaper}>Let’s get in touch:</Text>
                        <Box className='flex justify-center w-full h-full mt-12'>
                            <Text component='p' className={styles.descriptionForm}>
                                Thank you for submitting a request for information
                                one of our agents will be in contact with you shortly
                            </Text>
                        </Box>
                    </>
                ) : (
                    <>
                        <Text component='h3' className={styles.titlePaper}>Let’s get in touch:</Text>
                        {
                            (listingData)
                                ?
                                <Text component='p' className={styles.descriptionForm}>
                                    Complete this form to get additional information on <span className='text-[#ffb839]'>{listingData?.title || 'this property'}.</span>
                                </Text>
                                :
                                <Text component='p' className={styles.descriptionForm}>
                                    Using the form below, please provide as much detailed information as possible.
                                </Text>
                        }
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
                                    placeholder='Phone number'
                                    propsForm={{ ...form.getInputProps("phone") }}
                                />
                                <InputForm
                                    isLoading={isLoading || isLoadingMutation}
                                    isDisabled={isLoading || isDisabled || isLoadingMutation}
                                    placeholder='Comments'
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