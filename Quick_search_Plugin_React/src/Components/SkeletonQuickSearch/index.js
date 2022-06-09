import React from 'react'
//mantine
import { Skeleton } from '@mantine/core';

// css
import styles from './styles.sqs.module.scss'

const SkeletonQuickSearch = () => {
    return (
        <>
            <Skeleton className={styles.ImagenSkeleton} height={35} />
            <Skeleton className='hide md:block' height={35} />
            <Skeleton height={35} />
            <Skeleton className={styles.titleSkeleton} height={35} />
            <Skeleton className={styles.descriptionSkeleton} height={35} />
        </>
    )
}

export default SkeletonQuickSearch