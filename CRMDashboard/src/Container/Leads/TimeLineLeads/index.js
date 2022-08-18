import React from 'react'
// mantine
import { Box } from "@mantine/core";
// components
import SelectStateLeads from './SelectStateLeads'

// styles
import useStyles from '../GlobalStyles'

const TimeLineLeads = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.containerTimeLine}>
            <Box className={classes.contentInfoLeads}>
                contact info
                <SelectStateLeads />
            </Box>
            <Box className={classes.contentTimeLIne}>
                time line
            </Box>
        </Box>
    )
}

export default TimeLineLeads