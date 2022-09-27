import React from 'react'
// mantine dev
import { Box, Skeleton } from '@mantine/core';
// styles 
import styles from './styles_FL_.module.scss'

const SkeletonFilters = () => {
    return (
        <Box className={styles.ContainerFilters}>
            <Skeleton
                className={styles.inputsearch}
                height={42}
                circle
                mb="xl"
            />
            <Skeleton
                className={styles.inputsearch}
                height={42}
                circle
                mb="xl"
            />
            <Skeleton
                className={styles.inputsearch}
                height={42}
                circle
                mb="xl"
            />
        </Box>
    )
}

export default SkeletonFilters