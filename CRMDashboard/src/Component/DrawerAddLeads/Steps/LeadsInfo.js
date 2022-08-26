import React from 'react'
// mantine
import {
    Box,
    createStyles,
    TextInput,
    Textarea,
    SegmentedControl,
    Select,
    Divider,
    NumberInput,
    Text
} from '@mantine/core';
// icons
import { User, Mail, Search, Note, Phone } from 'tabler-icons-react';

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
        '.mantine-SegmentedControl-active': {
            display: 'none'
        }
    },
    NumberInput: {
        backgroundColor: theme.colors.white[0],
        borderColor: theme.colors.gray[6]
    },
    controllNumberInput: {
        backgroundColor: theme.colors.white[0],
        borderColor: theme.colors.gray[6],
        '&:hover': {
            backgroundColor: `${theme.colors.primary[9]} !important`,
            borderColor: theme.colors.primary[9],
            color: theme.colors.white[0]
        }
    },
    subTitle: {
        color: theme.colors.dark[0],
        fontSize: "16px",
        lineHeight: "20px",
        fontWeight: 700,
    },
}));

const LeadsInfo = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.containerMain}>
            <SegmentedControl
                className={`${classes.input_2} ${classes.radioSegment}`}
                size='sm'
                data={[
                    { label: 'New leads', value: 'react' },
                    { label: 'Assign leads to an existing client', value: 'ng' },
                ]}
            />

            <Select
                label={null}
                placeholder="Select cliente"
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
                placeholder={null}
                label="Name leads"
                icon={<User />}
            />
            <TextInput
                className={classes.input}
                placeholder={null}
                label="Email client"
                icon={<Mail />}
            />
            <NumberInput
                className={classes.input}
                classNames={{
                    input: classes.NumberInput,
                    control: classes.controllNumberInput
                }}
                placeholder={null}
                label="Phone Number"
                icon={<Phone />}
            />
            <Textarea
                className={`${classes.input} ${classes.inputFull}`}
                placeholder={null}
                icon={<Note />}
                label="Note"
            />

            <Text
                component='h3'
                className={`${classes.title} ${classes.inputFull}`}
            >
                optional info
            </Text>
            <TextInput
                className={classes.input}
                placeholder={null}
                label="other name"
                icon={<User />}
            />
            <TextInput
                className={classes.input}
                placeholder={null}
                label="other Email"
                icon={<Mail />}
            />
            <NumberInput
                className={classes.input}
                classNames={{
                    input: classes.NumberInput,
                    control: classes.controllNumberInput
                }}
                placeholder={null}
                label="other Phone"
                icon={<Phone />}
            />
        </Box>
    )
}

export default LeadsInfo