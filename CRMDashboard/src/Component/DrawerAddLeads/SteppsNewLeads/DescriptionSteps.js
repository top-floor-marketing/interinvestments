import React from 'react'
// mantine
import { Box, Text, Badge } from '@mantine/core';
// styles 
import useStyles from './styles'

const DescriptionSteps = ({ stepperActive, position, text }) => {
    const { classes } = useStyles({ color: 'secondary' });

    const BadgeStepsLabel = () => {
        if (stepperActive < position) {
            return ({
                classBadge: classes.BadgeSteps,
                label: 'Pending'
            })
        }
        if (stepperActive === position) {
            return ({
                classBadge: classes.BadgeInProgress,
                label: 'In Progress'
            })
        }
        return ({
            classBadge: classes.BadgeCompleted,
            label: 'Completed'
        })
    }

    return (
        <Box className={classes.containerDescriptionStep}>
            <Text component="span" className={classes.descriptionStep}>
                {text}
            </Text>
            <Badge
                className={`${BadgeStepsLabel().classBadge}`}
                size="lg"
                radius="lg"
            >
                {
                    BadgeStepsLabel().label
                }

            </Badge>
        </Box>
    )
}

export default DescriptionSteps