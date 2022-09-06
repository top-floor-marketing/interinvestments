import React from 'react'
// mantine
import { Box, Button, Paper } from "@mantine/core";
// components
// import SkeletonLeads from "./SkeletonLeads";
import BadgeSelect from '../../Component/BadgeSelect'
import TimeLineLeads from './TimeLineLeads'
import InputSearch from '../../Component/InputSearch'
import { HoccDraewerAL } from '../../Component/DrawerAddLeads'
import { Plus } from 'tabler-icons-react';

// styles
import useStyles from './GlobalStyles'

const Leads = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.containerMain}>
            <Paper className={classes.cardFilters}>
                <Box className={classes.containerInputSearch}>
                    <InputSearch />
                </Box>
                <Box className={classes.containerBadge}>
                    <BadgeSelect />
                </Box>
                <HoccDraewerAL
                    title='Add New Leads'
                    onSuccessAddLeads={() => alert('onSuccessAddLeads')}
                >
                    <Button
                        color='dark'
                        className={classes.ButtonAddLead}
                        leftIcon={<Plus />}
                    >
                        Add Lead
                    </Button>
                </HoccDraewerAL>
            </Paper>
            <Paper className={classes.cardLeads}>
                <TimeLineLeads />
            </Paper>
        </Box>
    )
}

export default Leads