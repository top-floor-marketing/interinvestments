import React from 'react'
// mantine
import { Box, createStyles, TextInput } from '@mantine/core';
// icons
import { User, Mail } from 'tabler-icons-react';

const useStyles = createStyles((theme, _params) => ({
    containerMain: {
        display: 'flex',
        flexDirection: 'row',
        gap: theme.other.spacing.p4
    },
    input: {
        width: '100%'
    }
}));

const LeadsInfo = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.containerMain}>
            <TextInput
                className={classes.input}
                placeholder="Name leads"
                label="Name leads"
                rightSection={<User />}
            />
            <TextInput
                className={classes.input}
                placeholder="Email client"
                label="Email client"
                rightSection={<Mail />}
            />
        </Box>
    )
}

export default LeadsInfo