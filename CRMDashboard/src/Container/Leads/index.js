import React from 'react'
// mantine
import { Box, Card } from "@mantine/core";
// components
// import SkeletonLeads from "./SkeletonLeads";
import BadgeSelect from '../../Component/BadgeSelect'
import InputSearch from '../../Component/InputSearch'

// styles
import useStyles from './GlobalStyles'

const Leads = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.containerMain}>
            <Card className={classes.cardFilters}>
                <Box className={classes.containerInputSearch}>
                    <InputSearch />
                </Box>
                <Box className={classes.containerBadge}>
                    <BadgeSelect />
                </Box>
                <p>button</p>
            </Card>
            <Card className={classes.cardLeads}>
                <p>sfasfasfas</p>
            </Card>
        </Box>
    )
}

export default Leads