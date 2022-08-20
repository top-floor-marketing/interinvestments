import React from 'react'
// component
import ListInfoLeads from './ListInfoLeads'
// mantine
import { Box, Text } from "@mantine/core";
// components
import SelectStateLeads from './SelectStateLeads'
import TimelineLeads from './TimelineLeads'

// styles
import useStyles from '../GlobalStyles'

const TimeLineLeads = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.containerTimeLine}>
            <Box className={classes.contentInfoLeads}>
                <SelectStateLeads />
                <Box className={classes.containerContactInfo}>
                    <Text className={classes.textContactInfo} component='p'>Contact info</Text>
                </Box>
                <ListInfoLeads />
            </Box>
            <Box className={classes.contentTimeLIne}>
                <TimelineLeads />
            </Box>
        </Box>
    )
}

export default TimeLineLeads