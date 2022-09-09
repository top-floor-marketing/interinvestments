import React from 'react'
// mantine
import { Skeleton, Box, createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params) => {
    // 1.25rem === p5
    const ROW_HEIGHT = 70;

    return {
        containerSkeletonPipeline: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: theme.other.spacing.p4,
        },
        SkeletonPaperStatus: {
            width: "100%",
            height: ROW_HEIGHT,
            display: "flex",
            flexDirection: "row",
            fontSize: "18px",
            fontWeight: 600,
            gap: theme.other.spacing.p4,
            padding: theme.other.spacing.p4
        },
        skeleton: {
            width: '100%',
            height: "45px"
        }
    }
});


const SkeletonPipeline = () => {
    const { classes } = useStyles()
    return (
        <Box className={classes.containerSkeletonPipeline}>
            <Box className={classes.SkeletonPaperStatus}>
                <Skeleton width={70} radius="xl" />
            </Box>
        </Box>
    )
}

export default SkeletonPipeline