import React from 'react'
// components
import CardAgent from './CardAgent'
// mantine
import { Box } from '@mantine/core';
// styles
import styles from './styles.GA.module.scss'

const GridAgend = () => {
    return (
        <Box className={styles.ContainerGridAllAGent}>
            <CardAgent />
            <CardAgent />
            <CardAgent />
            <CardAgent />
            <CardAgent />
            <CardAgent />
            <CardAgent />
            <CardAgent />
            <CardAgent />
        </Box>
    )
}

export default GridAgend