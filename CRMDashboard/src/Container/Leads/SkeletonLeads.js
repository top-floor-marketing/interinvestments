import React from 'react'
// componet
import SpringDiv from "../../Component/SpringDiv";
// mantine
import { Box, Skeleton } from "@mantine/core";
// styles
import useStyles from './GlobalStyles'

const SkeletonLeads = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.containerMain}>
            <SpringDiv delay={100} duration={300} >
                <Skeleton visible className={classes.containerFilterLeads} />
            </SpringDiv>
            <SpringDiv delay={400} duration={300} fullHeight>
                <Skeleton visible className={classes.containerLeads} />
            </SpringDiv>
        </Box>

    )
}

export default SkeletonLeads