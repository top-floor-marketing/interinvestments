import React from 'react'
import SkeletonListing from '../SkeletonListing/index.js'

//css
import styles from './styles.mqs.module.scss'

const LoadingMenu = () => {
    return (
        <div className={styles.SkeletonListing}>
            <SkeletonListing />
            <SkeletonListing />
            <SkeletonListing />
        </div>
    )
}

export default LoadingMenu