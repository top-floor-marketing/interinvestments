import React from 'react'
//mantine
import { Skeleton, Divider, Box } from '@mantine/core';

//ccss
import styles from './styles.sl.module.scss'

const SkeletonListing = () => {
  return (
    <>
      <Box className={styles.containerSkeletonListing}>
        <Skeleton height={120} className={styles.imageSkeleton} />
        <Box className={styles.boxContend}>
          <Skeleton className='my-2' height={25} />
          <Skeleton className='w-1/4 my-2' width={'25%'} height={25} />
          <Box className={styles.boxDescription}>
            <Skeleton className='my-2' width={'33.333333%'} height={25} />
            <Skeleton className='my-2' width={'33.333333%'} height={25} />
          </Box>
        </Box>
      </Box>
      <Divider my="sm" />
    </>
  )
}

export default SkeletonListing