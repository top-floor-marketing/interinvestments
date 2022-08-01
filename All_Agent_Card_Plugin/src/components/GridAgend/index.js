import React from 'react'
// components
import CardAgent from './CardAgent'
import CardSkeleton from './CardSkeleton'
// mantine
import { Box } from '@mantine/core';
// styles
import styles from './styles.GA.module.scss'

const GridAgend = ({ listAgent, isLoading }) => {

    console.log('listAgent', listAgent)

    if (isLoading) {
        return (
            <Box className={styles.ContainerGridAllAGent}>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </Box>
        )
    }

    return (
        <Box className={styles.ContainerGridAllAGent}>
            <CardAgent />
            <CardAgent />
            <CardAgent />
            <CardAgent />
        </Box>
    )
}

export default GridAgend