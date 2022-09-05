import React from 'react'
// mantine
import { Box, Skeleton } from '@mantine/core';
// styles 
import styles from './styles.ca.module.scss'

const SkeletonCardAgent = () => {
    return (
        <Box className={styles.containerCard}>
            <Box>
                <Skeleton
                    className={{
                        root: 'mx-auto md:mx-0'
                    }}
                    height={170} circle
                />
            </Box>
            <Box className={styles.containInfoAgent}>
                <Skeleton
                    className='ml-0 md:ml-4'
                    height={59}
                    radius="sm"
                />
                <Skeleton
                    className='w-full max-w-[368px] mt-2 ml-0 md:ml-4'
                    height={28}
                    radius="sm"
                />
                <Skeleton
                    className='mt-0 ml-0 md:ml-4 md:mt-10'
                    height={143}
                    radius="sm"
                />
                <Skeleton
                    className='ml-0 mt-0 md:ml-4 md:mt-10 max-w-[450px]'
                    height={40}
                    radius="sm"
                />
                <Skeleton
                    className='ml-0 mt-0 md:ml-4 md:mt-2 max-w-[450px]'
                    height={40}
                    radius="sm"
                />
                <Box className={styles.containerSocialMedia}>
                    <Skeleton
                        className='w-[32.45px]'
                        height={32.45}
                        radius="sm"
                    />
                    <Skeleton
                        className='w-[32.45px]'
                        height={32.45}
                        radius="sm"
                    />
                    <Skeleton
                        className='w-[32.45px]'
                        height={32.45}
                        radius="sm"
                    />
                    <Skeleton
                        className='w-[32.45px]'
                        height={32.45}
                        radius="sm"
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default SkeletonCardAgent