import React from 'react'
// mantine 
import { Box, Text, createStyles } from '@mantine/core';
// components
import PipelineItem from './PipelineItem'
import { PipelineColumnVirtual } from '../../Component/VirtualListContainer';


const useStyles = createStyles((theme, _params) => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4,
        position: "relative"
    },
    titlePipeline: {
        fontSize: '24px',
        fontWeight: '12px'
    },
    containerPipeline: {
        display: 'flex',
        flexDirection: 'row',
        height: '400px'
    }
}));


const Pipeline = () => {
    const { classes } = useStyles()


    const defaultData = [
        {
            avatar: {
                url: 'https://www.twitch.tv/elxokas'
            },
            state: 6,
            nameLeads: 'name 1'
        },
        {
            avatar: {
                url: 'https://www.twitch.tv/elxokas'
            },
            state: 6,
            nameLeads: 'name 2'
        },
        {
            avatar: {
                url: 'https://www.twitch.tv/elxokas'
            },
            state: 6,
            nameLeads: 'name 4'
        }
    ]

    return (
        <Box className={classes.container}>
            <Text className={classes.titlePipeline} component='h3'>Pipeline</Text>
            <Box className={classes.containerPipeline}>
                <PipelineColumnVirtual
                    data={defaultData}
                    totalData={defaultData.length}
                    color='error'
                    title='Not Contacted'
                >
                    <PipelineItem />
                </PipelineColumnVirtual>
            </Box>
        </Box>
    )
}

export default Pipeline