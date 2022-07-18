import React, { useState } from 'react'
// componenst
import PaperForm from './PaperForm'
// mantine
import { Box, Text } from '@mantine/core';
// styles
import styles from './styles.cf.module.scss'
// react-query
import { useQueryHelper } from '../../GraphqlClient/useRequest';
import { LISTINGS_BY_SLOG_FORM } from '../../GraphqlClient/GQL';

const ContactForm = () => {
    const [listingData, setListingData] = useState(null)
    const [isErroForm, setIsErroForm] = useState(false)

    const uri = window.location.pathname
    const slugLIsting = uri.split('/')[uri.split('/').length - 2]


    const { isLoading, error } = useQueryHelper({
        name: 'LISTINGS_BY_SLOG',
        gql: LISTINGS_BY_SLOG_FORM,
        variables: {
            "title": slugLIsting.replace(/-/g, ' ')
        },
        config: {
            onSuccess: (req) => {
                setListingData(...req.listings.nodes)
            }
        }
    });


    if (error || isErroForm) {
        return (
            <Box
                className={styles.containerForm}
                data-aos="zoom-in"
                data-aos-duration="700"
            >
                <Box className={styles.PaperFondo} />
                <Box className='w-full h-[485px] flex flex-col justify-center items-center'>
                    <Text
                        component='h4'
                        className={`${styles.titlePaper} text-white`}
                    >
                        Error
                    </Text>
                    <Text
                        component='p'
                        className={`${styles.descriptionForm} mx-auto w-2/3 text-white relative`}
                    >
                        Please wait a few minutes before you try again
                    </Text>
                </Box>
            </Box>
        )
    }


    return (
        <Box className={styles.containerForm}>
            <Box className={styles.PaperFondo} />
            <PaperForm
                setIsErroForm={setIsErroForm}
                listingData={listingData}
                isLoading={isLoading}
            />
        </Box>
    )
}

export default ContactForm