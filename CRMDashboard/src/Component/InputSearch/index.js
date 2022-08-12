import React from 'react'
// mantine
import { TextInput, createStyles } from '@mantine/core';
import { Search } from 'tabler-icons-react';

const useStyles = createStyles((theme, _params, getRef) => ({
    containerInputSeach: {
        width: "100%",
    },
    input: {
        borderRadius: '0px',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none'
    }
}));


const InputSearch = () => {
    const { classes } = useStyles();
    return (
        <TextInput
            className={classes.containerInputSeach}
            classNames={{
                input: classes.input
            }}
            placeholder="Search..."
            rightSection={<Search size={24} />}
        />
    )
}

export default InputSearch