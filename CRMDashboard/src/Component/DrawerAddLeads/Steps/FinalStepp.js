import React from 'react'
// mantine
import { Box, Text, Badge } from '@mantine/core';
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'
// styles 
import useStyles from './styles'

const FinalStepp = () => {
    const { state: { addLeads } } = useClientGlobalStore()
    const { classes } = useStyles();

    console.log('addLeads Store', addLeads)

    return (
        <Box className={classes.containerFinalSteps}>
            <Box className={classes.contedInterested}>
                <Text
                    className={classes.titleFinalStepIfo}
                    component='h3'
                >
                    Info Leads
                </Text>
                <Box className={classes.containerInfo}>
                    <Text component='span'>
                        <strong>
                            Type Leads :
                        </strong>
                    </Text>
                    <Badge size="lg">{addLeads.typeLeads}</Badge>
                </Box>
                <Box className={classes.containerInfo}>
                    <Text component='span'>
                        <strong>
                            Name Leads:
                        </strong>
                    </Text>
                    <Text component='span'>{addLeads.dataForm.nameLeads}</Text>
                </Box>
            </Box>
            <Box>
                <Text
                    className={classes.titleFinalStepIfo}
                    component='h3'
                >
                    Interested in
                </Text>
            </Box>
        </Box>
    )
}

export default FinalStepp