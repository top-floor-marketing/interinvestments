import React from 'react'
// mantine
import { Text, Paper, createStyles, Avatar, Box } from '@mantine/core';
import {
    ListDetails,
    FileDollar,
    BuildingStore,
    ChartInfographic,
    BuildingWarehouse
} from 'tabler-icons-react';
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'

const useStyles = createStyles((theme, _params) => ({
    paper: {
        width: '100%'
    },
    paperBody: {
        display: 'flex',
        flexDirection: 'row',
        gap: '14px',
        justifyItems: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: '30px'
    },
    icon: {
        padding: '10px',
        color: theme.colors.white[0],
        backgroundColor: theme.colors.primary[4]
    }
}));

const CardAvatarDrawer = ({ DataInterested, type }) => {
    const { state: { addLeads } } = useClientGlobalStore()
    const { classes } = useStyles()
    const { photo, title, databaseId, neighborhood } = DataInterested


    const typeIcon = (label) => {

        const props = {
            className: `${classes.avatar} ${classes.icon}`,
            size: 60
        }

        switch (label) {
            case "Buyers":
                return <FileDollar {...props} size={42} />

            case "Commercial":
                return <BuildingStore {...props} size={42} />

            case "Invest":
                return <ChartInfographic {...props} size={42} />

            case "Renters":
                return <BuildingWarehouse {...props} size={42} />

            default:
                return <ListDetails {...props} size={42} />

        }
    }


    if (type === "LISTING") {
        return (
            <Paper className={classes.paper}>
                <Box className={classes.paperBody}>
                    <Avatar
                        className={classes.avatar}
                        size={60}
                        src={photo}
                        alt={`${title}_${databaseId}`}
                    />
                    <Box>
                        <Text component='h3'>{title}</Text>
                        <Text component='span'>{neighborhood}</Text>
                    </Box>
                </Box>
            </Paper>
        )
    } else {
        return (
            <Paper className={classes.paper}>
                <Box className={classes.paperBody}>
                    {
                        typeIcon(addLeads.totalServices.find((item) => (item.value === DataInterested)).label)
                    }
                    <Box>
                        <Text component='h3'>
                            {
                                addLeads.totalServices.find((item) => (item.value === DataInterested)).label
                            }
                        </Text>
                        <Text component='span'>Services</Text>
                    </Box>
                </Box>
            </Paper>
        )
    }

}

export default CardAvatarDrawer