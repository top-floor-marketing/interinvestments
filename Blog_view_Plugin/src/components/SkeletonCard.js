import React from 'react'

//mantine
import { Skeleton, Box } from '@mantine/core';

const SkeletonCard = () => {
    return (
        <Box data-aos="zoom-in">
            <Skeleton height={461} />
        </Box>
    )
}

export default SkeletonCard