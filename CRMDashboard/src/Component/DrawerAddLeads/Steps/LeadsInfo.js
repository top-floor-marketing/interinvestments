import React from 'react'
// mantine
import { Box, createStyles, TextInput, Textarea, SegmentedControl, Select, Divider } from '@mantine/core';
// icons
import { User, Mail, Search, Note } from 'tabler-icons-react';

const useStyles = createStyles((theme, _params) => ({
    containerMain: {
        display: "grid",
        gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        },
        gap: theme.other.spacing.p4
    },
    input: {
        width: '100%'
    },
    inputFull: {
        gridColumn: "1 / -1",
    },
    input_2: {
        gridColumn: 'span 2 / span 2'
    },
    radioSegment: {
        alignItems: 'end !important',
        '.mantine-SegmentedControl-active': {
            display: 'none'
        }
    }
}));

const LeadsInfo = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.containerMain}>
            <SegmentedControl
                className={`${classes.radioSegment} ${classes.input_2}`}
                size='sm'
                data={[
                    { label: 'New leads', value: 'react' },
                    { label: 'Assign leads to an existing client', value: 'ng' },
                ]}
            />

            <Select
                label="Select cliente"
                placeholder={null}
                searchable
                nothingFound="No options"
                rightSection={<Search size={24} />}
                data={[
                    { value: 'react', label: 'React' },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                    { value: 'vue', label: 'Vue' },
                ]}
            />
            <Divider className={classes.inputFull} my="sm" />
            <TextInput
                className={classes.input}
                placeholder="Name leads"
                label="Name leads"
                icon={<User />}
            />
            <TextInput
                className={classes.input}
                placeholder="Email client"
                label="Email client"
                icon={<Mail />}
            />
            <Textarea
                className={`${classes.input} ${classes.inputFull}`}
                placeholder="your note leads..."
                icon={<Note />}
                label="Note"
            />
        </Box>
    )
}

export default LeadsInfo