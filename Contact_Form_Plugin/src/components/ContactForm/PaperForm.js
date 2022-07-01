import React from 'react'
// components
import InputForm from './InputForm'
import { Text, Paper, Box } from '@mantine/core';
// styles
import styles from './styles.cf.module.scss'

const PaperForm = () => {
    return (
        <Paper className={styles.PaperForm}>
            <Text component='h4' className={styles.titlePaper}>Let’s get in touch:</Text>
            <Text component='p' className={styles.descriptionForm}>
                Using the form below, please provide as much detailed information as possible.
            </Text>
            <Box>
                <InputForm />
            </Box>
        </Paper>
    )
}

export default PaperForm