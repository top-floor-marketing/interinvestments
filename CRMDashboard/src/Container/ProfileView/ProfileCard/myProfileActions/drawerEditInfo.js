import React from 'react'
// componets
import FormEditProfile from '../myProfileActions/FormEditProfile'

// mantine dev
import { Drawer, createStyles, Text, Box } from '@mantine/core';
// icons
import { Edit } from 'tabler-icons-react';

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


const DrawerEditInfo = ({ isOpen, dataAgent, onClose, isLoading, onSubmit }) => {
    const { classes } = useStyles();

    const Props = {
        Drawer: {
            opened: isOpen,
            onClose: () => onClose(),
            title: (
                <Box className={classes.boxTitle}>
                    <Edit size={20} />
                    <Text component="h1" className={classes.titleModal}>Edit my public info</Text>
                </Box>
            ),
            padding: "xl",
            size: "xl",
            classNames: {
                drawer: classes.containerDrawer,
                header: classes.iconClose
            }
        }
    }

    return (
        <Drawer {...Props.Drawer}>
            <FormEditProfile
                isLoading={isLoading}
                dataAgent={dataAgent}
                onSubmit={onSubmit}
            />
        </Drawer>
    )
}

// Specifies the default values for props:
DrawerEditInfo.defaultProps = {
    isOpen: false,
    dataAgent: null,
    onClose: () => { },
    onSubmit: () => { },
    isLoading: false
};

export default DrawerEditInfo