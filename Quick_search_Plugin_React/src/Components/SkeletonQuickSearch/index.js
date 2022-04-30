import React from 'react'
//mantine
import { Skeleton } from '@mantine/core';

const SkeletonQuickSearch = () => {
    return (
        <>
            <Skeleton className='col-span-3 md:col-span-1' height={35} />
            <Skeleton className='hide md:block' height={35} />
            <Skeleton height={35} />
            <Skeleton className='col-span-3 md:col-span-1' height={35} />
            <Skeleton className='col-span-3 md:col-span-2' height={35} />
        </>
    )
}

export default SkeletonQuickSearch