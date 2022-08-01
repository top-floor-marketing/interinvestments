import React from 'react'
// components
import CardAgent from './CardAgent'
import CardSkeleton from './CardSkeleton'
// mantine
import { Box } from '@mantine/core';
// styles
import styles from './styles.GA.module.scss'

const GridAgend = ({ listAgent, isLoading }) => {

    //console.log('listAgent', listAgent)

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

    if (listAgent.length === 0) {
        return (
            <Box className={styles.ContainerGridAllAGent}>
                <p className='col-span-4 text-center'>no data</p>
            </Box>
        )
    }

    return (
        <Box className={styles.ContainerGridAllAGent}>
            {
                listAgent.map((value, index) => (
                    <CardAgent data={{ ...value }} key={index} />
                ))
            }
        </Box>
    )
}

export default GridAgend