import React from 'react'
// mantine
import { Box } from "@mantine/core";
// icon
import { ChevronDown } from 'tabler-icons-react';
// styles
import useStyles from './stylesBadgeS'

const ChevronIcon = ({ refProps }) => {
    const { classes } = useStyles();
    return (
        <Box
            className={classes.ChevronIcon}
            onClick={() => refProps.current.click()}
        >
            <ChevronDown color='white' size={14} />
        </Box>
    )
}

export default ChevronIcon
