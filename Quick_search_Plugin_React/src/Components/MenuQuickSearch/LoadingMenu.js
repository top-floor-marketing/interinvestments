import React from 'react'
import SkeletonListing from '../SkeletonListing'

const LoadingMenu = () => {
    return (
        <div className='h-[350px] overflow-auto'>
            <SkeletonListing />
            <SkeletonListing />
            <SkeletonListing />
        </div>
    )
}

export default LoadingMenu