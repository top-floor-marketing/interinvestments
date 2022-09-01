import React from 'react'
// mantine
import { Box, Button } from '@mantine/core';
// global store
// import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'
// styles 
import useStyles from './styles'

const FinalStepp = () => {
    // const { state: { addLeads } } = useClientGlobalStore()
    const { classes } = useStyles();
    return (
        <Box className={classes.containerFinalSteps}>
            <Box>
                <p>Completed, click back button to get to previous step</p>
                FinalStepp
            </Box>
            <Button color='success' size="lg">
                Complete leads
            </Button>
        </Box>
    )
}

export default FinalStepp