import React from 'react'
// mantine
import { Box, createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme, _params) => ({
    containerMain: {
        height: '100%',
        width: '100%',
        padding: '20px',
        [`${theme.fn.smallerThan("md")}`]: {
            paddingRight: '0px',
            paddingLeft: '0px'
        }
    },
    title: {
        color: theme.colors.dark[0],
        fontSize: "18px",
        lineHeight: "20px",
        fontWeight: 700,
    },
    boxContendStep: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    }
}));

const ContainerStep = ({ children, title = 'Lorem ipsum' }) => {
    const { classes } = useStyles();
    return (
        <Box className={classes.containerMain}>
            <Box className={classes.boxContendStep}>
                <Text
                    component='h3'
                    className={classes.title}
                >
                    {title}
                </Text>
                {children}
            </Box>
        </Box>
    )
}

export default ContainerStep