import React from 'react'
// mantine
import { Box, createStyles, TextInput, Textarea } from '@mantine/core';
// icons
import { User, Mail } from 'tabler-icons-react';

const useStyles = createStyles((theme, _params) => ({
    containerMain: {
        display: "grid",
        gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        },
        gap: theme.other.spacing.p4
    },
    input: {
        width: '100%'
    },
    inputFull: {
        gridColumn: "1 / -1",
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
            <Textarea
                className={`${classes.input} ${classes.inputFull}`}
                placeholder="your note leads..."
                label="Note"
            />
        </Box>
    )
}

export default LeadsInfo