import React from 'react'
// components
import SteppsNewLeads from './SteppsNewLeads'
// global store
import useClientGlobalStore from '../../GlobalStore/useClientGlobalStore'
// mantine devs
import { Drawer, createStyles, Box, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
// utils
import PropTypes from 'prop-types';
//  icons
import { AddressBook } from 'tabler-icons-react';

const useStyles = createStyles((theme, _params, getRef) => ({
    containerDrawer: {
        backgroundColor: theme.colors.white[0]
    },
    titleModal: {
        margin: "0px !important",
        padding: "0px !important",
        color: theme.colors.dark[0],
        fontSize: "18px",
        lineHeight: "20px",
        fontWeight: 700,
    },
    boxTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: theme.other.spacing.p2,
        top: '15%',
        [`${theme.fn.smallerThan("sm")}`]: {
            position: 'relative',
            marginBottom: '10px'
        }
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
    const { state: { addLeads: { loading } } } = useClientGlobalStore()
    const { classes } = useStyles();
    const matches = useMediaQuery('(min-width: 1024px)');

    const Props = {
        Drawer: {
            opened: opened,
            padding: "xl",
            size: (matches) ? '70%' : 'full',
            title: (
                <Box className={classes.boxTitle}>
                    <AddressBook size={20} />
                    <Text component="h1">
                        {title}
                    </Text>
                </Box>
            ),
            classNames: {
                drawer: classes.containerDrawer,
                header: classes.iconClose
            },
            closeOnClickOutside: !loading,
            onClose: (loading) ? () => { } : () => onCloseDrawer()
        }
    }

    return (
        <Drawer
            {...Props.Drawer}
        >
            <SteppsNewLeads title={title} onClose={onCloseDrawer} />
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