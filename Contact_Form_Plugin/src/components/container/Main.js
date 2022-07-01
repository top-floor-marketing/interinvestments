import React from 'react'
// components
import ContactForm from '../ContactForm'
// mantine
import { Box } from '@mantine/core';
// styles
import style from '../../blogStyles.module.scss'

const Main = () => {
    return (
        <Box className={style.containerMain}>
            <Box className={style.containerForm}>
                <Box />
                <ContactForm />
            </Box>
        </Box>
    )
}

export default Main