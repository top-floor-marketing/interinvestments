import React from 'react'
// mantine
import { Text } from "@mantine/core";

// styles
import useStyles from './stylesBadgeS'

const IconSelect = () => {
    const { classes } = useStyles();
    return (
        <Text
            className={classes.textInput}
            component='span'
        >
            Filters by:
        </Text>
    )
}

export default IconSelect