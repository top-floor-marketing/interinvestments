import React from 'react'
// components
import SteppsNewLeads from './SteppsNewLeads'
// mantine devs
import { Drawer, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
// utils
import PropTypes from 'prop-types';

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