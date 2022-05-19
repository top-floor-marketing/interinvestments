import React from 'react'
// mantine
import { Box, TextInput, Button } from '@mantine/core';
import { At } from 'tabler-icons-react';
//styles
import useStyles from './stylesLogin'

const Forgotpassword = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.containerForm} style={{ height: '187px' }}>
            <TextInput
                className={classes.InputForm}
                icon={<At />}
                placeholder="Your email"
                radius="md"
            />
        </Box>
    )
}

export default Forgotpassword