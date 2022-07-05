import React from 'react'
// componenst
import PaperForm from './PaperForm'
// mantine
import { Box } from '@mantine/core';
// styles
import styles from './styles.cf.module.scss'

const ContactForm = () => {
    return (
        <Box className={styles.containerForm}>
            <Box className={styles.PaperFondo} />
            <PaperForm />
        </Box>
    )
}

export default ContactForm