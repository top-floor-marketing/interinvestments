import React from 'react'
import { Skeleton, createStyles, Box } from '@mantine/core';

const useStyles = createStyles((theme, _params) => {
    return ({
        containerSkeleton: {
            marginTop: '30px',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '14px',
            [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                flexDirection: 'row',
            }
        }
    })
});

const Skeletong = () => {
    const { classes } = useStyles()

    const props = {
        Skeleton: {
            height: 125,
            radius: "xl"
        }
    }
    
    return (
        <Box className={classes.containerSkeleton}>
            <Skeleton {...props.Skeleton} />
            <Skeleton {...props.Skeleton} />
            <Skeleton {...props.Skeleton} />
            <Skeleton {...props.Skeleton} />
        </Box>
    )
}

export default Skeletong