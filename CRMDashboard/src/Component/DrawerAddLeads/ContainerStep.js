import React from 'react'
// mantine
import { Box, createStyles, Text } from '@mantine/core';
import SpringDiv from '../SpringDiv'

const useStyles = createStyles((theme, _params) => ({
    containerMain: {
        height: '100%',
        width: '100%',
        padding: '20px',
        [`${theme.fn.smallerThan("md")}`]: {
            paddingRight: '0px',
            paddingLeft: '0px'
        },
    },
    title: {
        color: theme.colors.dark[0],
        fontSize: "18px",
        lineHeight: "20px",
        fontWeight: 700,
    },
    boxContendStep: {
        width: '100%',
        height: '100% !important',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: theme.fn.rgba(theme.colors.gray[0], 1),
        padding: theme.other.spacing.p4
    }
}));

const ContainerStep = ({ children, title = 'Lorem ipsum' }) => {
    const { classes } = useStyles();
    return (
        <SpringDiv className={classes.containerMain} delay={200} duration={500} fullHeight>
            <Box className={classes.boxContendStep}>
                {
                    (title) && (
                        <Text
                            component='h3'
                            className={classes.title}
                        >
                            {title}
                        </Text>
                    )
                }
                {children}
            </Box>
        </SpringDiv>
    )
}

export default ContainerStep