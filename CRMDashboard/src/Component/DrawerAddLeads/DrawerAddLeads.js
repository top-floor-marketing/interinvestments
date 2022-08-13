import React from 'react'
// mantine devs
import { Drawer, createStyles, Box, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
// icons
import { AddressBook } from 'tabler-icons-react';
// utils
import PropTypes from 'prop-types';

const useStyles = createStyles((theme, _params, getRef) => ({
    containerDrawer: {
        backgroundColor: theme.colors.white[0]
    },
    boxTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: theme.other.spacing.p2,
    },
    titleModal: {
        margin: "0px !important",
        padding: "0px !important",
        color: theme.colors.dark[0],
        fontSize: "18px",
        lineHeight: "20px",
        fontWeight: 700,
    },
    iconClose: {
        '.mantine-UnstyledButton-root': {
            width: '24px',
            height: 'auto',
            'svg': {
                width: '24px',
                height: 'auto',
            },
            color: theme.colors.dark[0],
            '&:hover': {
                color: theme.colors.gray[8]
            }
        }
    }
}))

const DrawerAddLeads = ({ opened, onClose: onCloseDrawer, title }) => {
    const { classes } = useStyles();
    const matches = useMediaQuery('(min-width: 1024px)');

    const Props = {
        Drawer: {
            opened: opened,
            title: (
                <Box className={classes.boxTitle}>
                    <AddressBook size={20} />
                    <Text component="h1" className={classes.titleModal}>
                        {title}
                    </Text>
                </Box>
            ),
            padding: "xl",
            size: (matches) ? '60%' : 'full',
            classNames: {
                drawer: classes.containerDrawer,
                header: classes.iconClose
            },
            onClose: () => onCloseDrawer()
        }
    }

    return (
        <Drawer {...Props.Drawer}>
            <p>contend Drawer</p>
        </Drawer>
    )
}

// Specifies the default values for props:
DrawerAddLeads.defaultProps = {
    opened: false,
    title: 'Lorem ipsum dolor',
    onCloseDrawer: () => console.log('onCloseDrawer')
};

DrawerAddLeads.propTypes = {
    opened: PropTypes.bool,
    title: PropTypes.string,
    onCloseDrawer: PropTypes.func
};

export default DrawerAddLeads