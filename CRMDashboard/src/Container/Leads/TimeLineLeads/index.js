import React from 'react'
// component
import ListInfoLeads from './ListInfoLeads'
// mantine
import { Box, Text, TextInput } from "@mantine/core";
// components
import SelectStateLeads from '../../../Component/SelectStateLeads'
import TimelineLeads from './TimelineLeads'

// styles
import useStyles from '../GlobalStyles'
import { MessageCircle } from 'tabler-icons-react';

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
                <TextInput
                    label={null}
                    placeholder="Your email"
                    rightSection={<MessageCircle />}
                />
            </Box>

        </Box>
    )
}

export default TimeLineLeads