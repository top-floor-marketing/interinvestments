import React from 'react'
//mantine
import { Skeleton, Divider } from '@mantine/core';

const SkeletonListing = () => {
  return (
    <>
      <div className='flex gap-3'>
        <Skeleton height={120} className='w-[187px] my-auto' />
        <div className='justify-center w-full'>
          <Skeleton className='w-1/3 my-2' height={25} />
          <Skeleton className='w-1/4 my-2' height={25} />
          <div className='flex w-full gap-2'>
            <Skeleton className='w-1/3 my-2' height={25} />
            <Skeleton className='w-1/3 my-2' height={25} />
          </div>
        </div>
      </div>
      <Divider my="sm" />
    </>
  )
}

export default SkeletonListing