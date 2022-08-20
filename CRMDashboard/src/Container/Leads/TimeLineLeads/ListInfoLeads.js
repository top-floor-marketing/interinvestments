import React from 'react'
// mantine
import { Box, Text, createStyles } from "@mantine/core";
import { User, Mail, Phone, DeviceMobile } from 'tabler-icons-react';


const useStyles = createStyles((theme, _params, getRef) => ({
    containerList: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.other.spacing.p4
    },
    containerItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        gap: theme.other.spacing.p4
    },
    icon: {
        color: theme.colors.secondary[8]
    },
    text: {
        fontSize: '18px',
        marginTop: '10px',
        marginBottom: '10px'
    }
}))

const ListInfoLeads = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.containerList}>
            <Box className={classes.containerItem}>
                <User className={classes.icon} size={32} />
                <Text
                    className={classes.text}
                    component='p'
                >
                    Lorem ipsum dolor
                </Text>
            </Box>
            <Box className={classes.containerItem}>
                <Mail className={classes.icon} size={32} />
                <Text
                    className={classes.text}
                    component='p'
                >
                    Lorem ipsum dolor
                </Text>
            </Box>
            <Box className={classes.containerItem}>
                <Phone className={classes.icon} size={32} />
                <Text
                    className={classes.text}
                    component='p'
                >
                    Lorem ipsum dolor
                </Text>
            </Box>
            <Box className={classes.containerItem}>
                <DeviceMobile className={classes.icon} size={32} />
                <Text
                    className={classes.text}
                    component='p'
                >
                    Lorem ipsum dolor
                </Text>
            </Box>
        </Box>
    )
}

export default ListInfoLeads