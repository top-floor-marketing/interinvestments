import React from 'react'
// mantine
import { Box, Button, Paper } from "@mantine/core";
// components
// import SkeletonLeads from "./SkeletonLeads";
import BadgeSelect from '../../Component/BadgeSelect'
import InputSearch from '../../Component/InputSearch'
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
                <Button
                    color='dark'
                    className={classes.ButtonAddLead}
                    leftIcon={<Plus />}
                >
                    Add Lead
                </Button>
            </Paper>
            <Paper className={classes.cardLeads}>
                <p>sfasfasfas</p>
            </Paper>
        </Box>
    )
}

export default Leads