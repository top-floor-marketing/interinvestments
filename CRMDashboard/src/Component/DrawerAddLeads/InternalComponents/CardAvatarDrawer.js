import React from 'react'
// mantine
import { Text, Paper, createStyles, Avatar, Box } from '@mantine/core';

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
    }
}));

const CardAvatarDrawer = ({ DataInterested }) => {
    const { classes } = useStyles()

    console.log('DataInterested', DataInterested)

    return (
        <Paper className={classes.paper}>
            <Box className={classes.paperBody}>
                <Avatar
                    className={classes.avatar}
                    size={60}
                    src={DataInterested.photo}
                    alt={`${DataInterested.title}_${DataInterested.databaseId}`}
                />
                <Box>
                    <Text component='h3'>{DataInterested.title}</Text>
                    <Text component='span'>{DataInterested.neighborhood}</Text>
                </Box>
            </Box>
        </Paper>
    )
}

export default CardAvatarDrawer