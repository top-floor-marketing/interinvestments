import React from 'react'
import { createStyles, Text, Paper, Checkbox } from '@mantine/core';
import { ListDetails } from 'tabler-icons-react';

const useStyles = createStyles((theme) => {
    return ({
        paper: {
            display: 'flex',
            width: '130px',
            cursor: 'pointer',
            height: '150px',
            flexDirection: 'column',
            justifyItems: 'center',
            gap: '14px',
            backgroundColor: theme.colors.gray[3],
            alignItems: 'center',
            'h3': {
                margin: '0px'
            }
        },
        paperActive: {
            backgroundColor: `${theme.colors.gray[6]} !important`,
        },
        Checkbox: {
            '.mantine-Checkbox-input': {
                cursor: 'pointer',
            }
        }
    })
});

const PaperItem = ({ value, active, onChange: onChangeSegment }) => {
    const { classes } = useStyles()

    return (
        <Paper
            onClick={() => onChangeSegment(value.value)}
            className={`${classes.paper} ${(active) ? classes.paperActive : ''}`}
            shadow="xs"
        >
            <Text component='h3'>{value.label}</Text>
            <ListDetails size={42} />
            <Checkbox
                className={classes.Checkbox}
                checked={active}
                onChange={() => onChangeSegment(value.value)}
            />
        </Paper>
    )
}

export default PaperItem